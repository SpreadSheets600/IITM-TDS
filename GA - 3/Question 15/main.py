from collections import deque
from html.parser import HTMLParser
import time
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.request import Request, urlopen

BASE_URL = "https://sanand0.github.io/tdsdata/crawl_html/"
LOW = "O"
HIGH = "Y"


class AnchorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "a":
            return
        for key, value in attrs:
            if key.lower() == "href" and value:
                self.links.append(value)


def fetch_html(url: str, retries: int = 5, delay_sec: float = 0.5) -> str | None:
    for attempt in range(retries):
        try:
            request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urlopen(request, timeout=20) as response:
                content_type = response.headers.get("Content-Type", "")
                body = response.read().decode("utf-8", errors="ignore")
                if "html" not in content_type.lower() and "<html" not in body.lower():
                    return None
                return body
        except Exception:
            if attempt < retries - 1:
                time.sleep(delay_sec)
    return None


def filename_starts_in_range(url: str, low: str, high: str) -> bool:
    name = urlparse(url).path.rstrip("/").split("/")[-1]
    if not name.lower().endswith(".html"):
        return False
    first = name[0].upper()
    return low <= first <= high


def crawl(base_url: str) -> tuple[set[str], set[str]]:
    visited: set[str] = set()
    html_pages: set[str] = set()
    queue = deque([base_url])

    while queue:
        current = queue.popleft()
        if current in visited:
            continue
        visited.add(current)

        html = fetch_html(current)
        if not html:
            continue

        html_pages.add(current)
        parser = AnchorParser()
        parser.feed(html)

        for href in parser.links:
            nxt = urldefrag(urljoin(current, href))[0]
            if nxt.startswith(base_url) and nxt not in visited:
                queue.append(nxt)

    return visited, html_pages


if __name__ == "__main__":
    visited_urls, html_urls = crawl(BASE_URL)
    if BASE_URL not in html_urls:
        raise SystemExit(
            "Unable to fetch base URL. Check internet/DNS and run again."
        )
    count = sum(1 for url in html_urls if filename_starts_in_range(url, LOW, HIGH))

    print(f"Visited URLs: {len(visited_urls)}")
    print(f"HTML pages discovered: {len(html_urls)}")
    print(f"Files starting with {LOW}–{HIGH}: {count}")
