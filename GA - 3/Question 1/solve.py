import re
import urllib.request
from html import unescape

URL = "https://en.wikipedia.org/wiki/FIFA_World_Cup"


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


def main():
    with urllib.request.urlopen(URL) as resp:
        html = resp.read().decode("utf-8", errors="ignore")

    teams_table = find_table_by_caption(html, "Teams reaching the top four")
    teams_rows = extract_rows(teams_table)

    brazil_wins = None
    for r in teams_rows:
        if r and "brazil" in r[0].lower():
            # In this table, first numeric column after team is usually champions/titles.
            nums = [extract_number(x) for x in r[1:] if re.search(r"\d", x)]
            if not nums:
                raise RuntimeError("No numeric stats found for Brazil row")
            brazil_wins = nums[0]
            break
    if brazil_wins is None:
        raise RuntimeError("Brazil row not found in top-four table")

    scorers_table = find_table_by_caption(html, "Top goalscorers")
    scorers_rows = extract_rows(scorers_table)

    muller_goals = None
    for r in scorers_rows:
        row_text = " ".join(r).lower()
        if "gerd müller" in row_text or "gerd muller" in row_text:
            nums = [extract_number(x) for x in r if re.search(r"\d", x)]
            if not nums:
                raise RuntimeError("No goals number found in Gerd Müller row")
            muller_goals = nums[0]
            break
    if muller_goals is None:
        raise RuntimeError("Gerd Müller row not found in top goalscorers table")

    print(f"{brazil_wins}, {muller_goals}")


if __name__ == "__main__":
    main()
