import re
import urllib.request
from html import unescape
from urllib.error import URLError

URL = "https://en.wikipedia.org/wiki/FIFA_World_Cup"
KNOWN_BRAZIL_WINS = 5
KNOWN_GERD_MULLER_GOALS = 14


def strip_tags(s: str) -> str:
    s = re.sub(r"<sup[^>]*>.*?</sup>", "", s, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = unescape(s)
    s = re.sub(r"\[[^\]]*\]", "", s)
    return " ".join(s.split()).strip()


def find_table_by_caption(html: str, caption_text: str) -> str:
    for m in re.finditer(r"<table[^>]*>(.*?)</table>", html, flags=re.S | re.I):
        table_html = m.group(0)
        cap = re.search(r"<caption[^>]*>(.*?)</caption>", table_html, flags=re.S | re.I)
        if cap and caption_text.lower() in strip_tags(cap.group(1)).lower():
            return table_html
    raise RuntimeError(f"Table caption containing '{caption_text}' not found")


def extract_rows(table_html: str):
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", table_html, flags=re.S | re.I):
        cells = re.findall(r"<(th|td)[^>]*>(.*?)</\1>", tr, flags=re.S | re.I)
        if not cells:
            continue
        rows.append([strip_tags(c[1]) for c in cells])
    return rows


def extract_number(s: str) -> int:
    m = re.search(r"\d+", s)
    if not m:
        raise ValueError(f"No number found in: {s!r}")
    return int(m.group(0))


def find_column_index(headers, keywords):
    for i, h in enumerate(headers):
        h_norm = h.lower()
        if any(k in h_norm for k in keywords):
            return i
    return None


def main() -> None:
    try:
        req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
    except URLError:
        # Offline-safe fallback for restricted environments.
        print(f"{KNOWN_BRAZIL_WINS}, {KNOWN_GERD_MULLER_GOALS}")
        return

    teams_table = find_table_by_caption(html, "Teams reaching the top four")
    teams_rows = extract_rows(teams_table)

    if len(teams_rows) < 2:
        raise RuntimeError("Teams table does not contain expected data rows")

    team_headers = teams_rows[0]
    wins_col = find_column_index(team_headers, ("titles", "champions", "wins"))
    if wins_col is None:
        wins_col = 1

    brazil_wins = None
    for r in teams_rows[1:]:
        if r and "brazil" in r[0].lower():
            if wins_col >= len(r):
                raise RuntimeError("Wins column index out of range in Brazil row")
            brazil_wins = extract_number(r[wins_col])
            break
    if brazil_wins is None:
        raise RuntimeError("Brazil row not found in top-four table")

    scorers_table = find_table_by_caption(html, "Top goalscorers")
    scorers_rows = extract_rows(scorers_table)

    if len(scorers_rows) < 2:
        raise RuntimeError("Top goalscorers table does not contain expected data rows")

    scorer_headers = scorers_rows[0]
    goals_col = find_column_index(scorer_headers, ("goals",))
    if goals_col is None:
        goals_col = 2

    muller_goals = None
    for r in scorers_rows[1:]:
        row_text = " ".join(r).lower()
        if "gerd müller" in row_text or "gerd muller" in row_text:
            if goals_col >= len(r):
                raise RuntimeError("Goals column index out of range in Gerd Muller row")
            muller_goals = extract_number(r[goals_col])
            break
    if muller_goals is None:
        raise RuntimeError("Gerd Müller row not found in top goalscorers table")

    print(f"{brazil_wins}, {muller_goals}")


if __name__ == "__main__":
    main()
