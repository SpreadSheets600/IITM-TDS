import json
import re
import time
import urllib.parse
import urllib.request
from html import unescape
from typing import Any

IMDB_GRAPHQL_URL = "https://caching.graphql.imdb.com/"
IMDB_SEARCH_URL = "https://www.imdb.com/search/title/"
USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

QUERY = """
query AdvancedSearch($first: Int!) {
  advancedTitleSearch(
    first: $first
    constraints: {
      userRatingsConstraint: { aggregateRatingRange: { min: 5.0, max: 7.0 } }
    }
  ) {
    edges {
      node {
        title {
          id
          titleText {
            text
          }
          releaseYear {
            year
            endYear
          }
          ratingsSummary {
            aggregateRating
          }
          titleType {
            text
          }
        }
      }
    }
  }
}
"""


def strip_tags(value: str) -> str:
    value = re.sub(r"<[^>]+>", "", value)
    return " ".join(unescape(value).split()).strip()


def http_get(url: str, timeout: int = 30) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/json;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
        method="GET",
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read().decode("utf-8", errors="ignore")


def http_post_json(url: str, payload: dict[str, Any], timeout: int = 30) -> dict[str, Any]:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "User-Agent": USER_AGENT,
            "content-type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        body = response.read().decode("utf-8", errors="ignore")
    return json.loads(body)


def normalize_year(year_value: str) -> str:
    text = year_value.strip()
    text = text.replace("\u2014", "\u2013")  # em dash -> en dash
    text = text.replace("-", "\u2013")
    text = re.sub(r"\s+", " ", text)
    return text


def normalize_rating(rating_value: Any) -> str:
    if rating_value in (None, ""):
        return ""
    try:
        return f"{float(rating_value):.1f}"
    except Exception:
        text = str(rating_value).strip()
        match = re.search(r"\d+(?:\.\d+)?", text)
        if not match:
            return text
        return f"{float(match.group(0)):.1f}"


def build_output_row(idx: int, imdb_id: str, title: str, year: str, rating: Any) -> dict[str, str]:
    clean_title = re.sub(r"^\d+\.\s*", "", title.strip())
    return {
        "id": imdb_id.strip(),
        "title": f"{idx}. {clean_title}",
        "year": normalize_year(str(year)),
        "rating": normalize_rating(rating),
    }


def fetch_titles_graphql(limit: int) -> list[dict[str, str]]:
    payload = {
        "query": QUERY,
        "operationName": "AdvancedSearch",
        "variables": {"first": limit},
    }
    body = http_post_json(IMDB_GRAPHQL_URL, payload)
    edges = (body.get("data") or {}).get("advancedTitleSearch", {}).get("edges", [])
    if not edges:
        raise RuntimeError("IMDb GraphQL returned no data.")

    results: list[dict[str, str]] = []
    for idx, edge in enumerate(edges, start=1):
        title_obj = ((edge or {}).get("node") or {}).get("title") or {}
        imdb_id = str(title_obj.get("id") or "")
        if not re.fullmatch(r"tt\d+", imdb_id):
            continue

        name = ((title_obj.get("titleText") or {}).get("text") or "").strip()
        release_year = title_obj.get("releaseYear") or {}
        start_year = release_year.get("year", "")
        end_year = release_year.get("endYear", None)
        title_type = ((title_obj.get("titleType") or {}).get("text") or "").lower()

        if "series" in title_type and start_year:
            year_text = f"{start_year}\u2013 " if end_year is None else f"{start_year}\u2013{end_year}"
        else:
            year_text = str(start_year)

        rating = (title_obj.get("ratingsSummary") or {}).get("aggregateRating", "")
        results.append(build_output_row(idx, imdb_id, name, year_text, rating))
        if len(results) >= limit:
            break

    if not results:
        raise RuntimeError("IMDb GraphQL parsing produced zero titles.")
    return results


def fetch_titles_regex(limit: int) -> list[dict[str, str]]:
    query = urllib.parse.urlencode({"user_rating": "5,7", "count": str(limit)})
    html = http_get(f"{IMDB_SEARCH_URL}?{query}")

    matches = list(
        re.finditer(
            r'<a[^>]+href="/title/(tt\d+)/[^"]*"[^>]*>(.*?)</a>',
            html,
            flags=re.I | re.S,
        )
    )
    if not matches:
        raise RuntimeError("Could not find any title anchors in IMDb HTML.")

    seen: set[str] = set()
    rows: list[dict[str, str]] = []

    for m in matches:
        imdb_id = m.group(1)
        if imdb_id in seen:
            continue
        seen.add(imdb_id)

        title_raw = strip_tags(m.group(2))
        if not title_raw:
            continue

        # Parse nearby metadata in a small forward window from anchor location.
        start = m.start()
        window = html[start : start + 3000]

        year_match = re.search(
            r'dli-title-metadata-item[^>]*>\s*([^<]{2,20})\s*</span>',
            window,
            flags=re.I | re.S,
        )
        year_text = year_match.group(1).strip() if year_match else ""

        rating_match = re.search(
            r'ipc-rating-star--rating[^>]*>\s*([^<]+)\s*</span>',
            window,
            flags=re.I | re.S,
        )
        if not rating_match:
            rating_match = re.search(
                r'"aggregateRating"\s*:\s*"?([0-9]+(?:\.[0-9]+)?)"?',
                window,
                flags=re.I,
            )
        rating_text = rating_match.group(1).strip() if rating_match else ""

        rows.append(
            build_output_row(
                idx=len(rows) + 1,
                imdb_id=imdb_id,
                title=title_raw,
                year=year_text,
                rating=rating_text,
            )
        )

        if len(rows) >= limit:
            break

    if not rows:
        raise RuntimeError("Regex parser could not extract any IMDb rows.")
    return rows


def fetch_titles(limit: int = 25) -> list[dict[str, str]]:
    last_error = None
    for _ in range(3):
        try:
            return fetch_titles_graphql(limit)
        except Exception as exc:
            last_error = exc
            time.sleep(1)

    try:
        return fetch_titles_regex(limit)
    except Exception as exc:
        raise RuntimeError(f"Failed to fetch IMDb titles. Last error: {last_error}; Regex error: {exc}") from exc


if __name__ == "__main__":
    print(json.dumps(fetch_titles(25), ensure_ascii=False, indent=2))
