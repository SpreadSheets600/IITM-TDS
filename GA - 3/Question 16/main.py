import json
import subprocess
import time
import urllib.request

IMDB_GRAPHQL_URL = "https://caching.graphql.imdb.com/"

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


def fetch_titles(limit: int = 25):
    payload = {
        "query": QUERY,
        "operationName": "AdvancedSearch",
        "variables": {"first": limit},
    }

    req = urllib.request.Request(
        IMDB_GRAPHQL_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"content-type": "application/json"},
        method="POST",
    )

    body = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                body = json.loads(response.read().decode("utf-8"))
            break
        except Exception:
            if attempt < 4:
                time.sleep(1.0 * (attempt + 1))

    if body is None:
        curl_payload = json.dumps(payload)
        proc = subprocess.run(
            [
                "curl",
                "-sS",
                IMDB_GRAPHQL_URL,
                "-H",
                "content-type: application/json",
                "--data",
                curl_payload,
            ],
            capture_output=True,
            text=True,
            check=False,
        )
        if proc.returncode != 0 or not proc.stdout.strip():
            raise RuntimeError("Failed to fetch IMDb data via urllib and curl.")
        body = json.loads(proc.stdout)

    edges = body["data"]["advancedTitleSearch"]["edges"]

    results = []
    for idx, edge in enumerate(edges, start=1):
        title = edge["node"]["title"]
        imdb_id = title["id"]
        name = title["titleText"]["text"] if title.get("titleText") else ""
        release_year = title.get("releaseYear") or {}
        year = release_year.get("year", "")
        end_year = release_year.get("endYear", None)
        title_type = (title.get("titleType") or {}).get("text", "")
        is_series = "series" in title_type.lower()
        if is_series:
            if end_year is None:
                year_text = f"{year}\u2013 "
            else:
                year_text = f"{year}\u2013{end_year}"
        else:
            year_text = str(year)
        rating = (
            title["ratingsSummary"]["aggregateRating"]
            if title.get("ratingsSummary")
            else ""
        )

        results.append(
            {
                "id": str(imdb_id),
                "title": f"{idx}. {name}",
                "year": year_text,
                "rating": str(rating),
            }
        )

    return results


if __name__ == "__main__":
    data = fetch_titles(25)
    print(json.dumps(data, ensure_ascii=False, indent=2))
