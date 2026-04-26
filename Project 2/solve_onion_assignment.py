#!/usr/bin/env python3
"""
Solver for the TDS Onion Site Scraping Challenge.

ELI15 idea:
1. Open each starting page through Tor.
2. Follow links/pagination inside the same mini-site.
3. Save every rendered HTML page.
4. Use BeautifulSoup to pick numbers from visible text and hidden attributes.
5. Calculate the 12 answers and print the exact JSON payload.

Requirements:
  python -m pip install playwright beautifulsoup4 lxml
  python -m playwright install chromium

Before running, start Tor Browser and keep it open. Tor Browser usually exposes
SOCKS proxy 127.0.0.1:9150. If you run the tor daemon, use 127.0.0.1:9050.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import re
from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup, Tag
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

BASE = "http://tds26vu3ptapxx6igo6n26kuwfpn2l5omkmagc4hc7g7yn2o3xb25syd.onion"
STARTS = {
    "store": f"{BASE}/49/index.html",
    "home": f"{BASE}/49/cat/home/index.html",
    "apparel": f"{BASE}/49/cat/apparel/index.html",
    "tech": f"{BASE}/69/c/tech/index.html",
    "world": f"{BASE}/69/c/world/index.html",
    "business": f"{BASE}/69/c/business/index.html",
    "tiffany": f"{BASE}/69/author/author_21.html",
    "social": f"{BASE}/82/index.html",
    "explore": f"{BASE}/82/explore.html",
    "forum_users": f"{BASE}/6/users/index.html",
    "opsec": f"{BASE}/6/b/opsec/index.html",
}

MONEY_RE = re.compile(r"(?:₹|\$|USD|INR)?\s*([0-9][0-9,]*(?:\.\d+)?)")
NUM_RE = re.compile(r"-?\d[\d,]*")
RATING_RE = re.compile(r"(?:rating|rated)\D*([0-5](?:\.\d+)?)", re.I)
DATE_JUNE_2025_RE = re.compile(r"\b(?:June|Jun)\s+\d{1,2},?\s+2025\b|\b2025-06-\d{2}\b", re.I)


def clean_text(node) -> str:
    return " ".join(node.get_text(" ", strip=True).split()) if node else ""


def first_number(text: str) -> int | None:
    m = NUM_RE.search(text or "")
    return int(m.group(0).replace(",", "")) if m else None


def first_money(text: str) -> Decimal | None:
    m = MONEY_RE.search(text or "")
    return Decimal(m.group(1).replace(",", "")) if m else None


def q2(x: Decimal) -> str:
    return str(x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def abs_url(current_url: str, href: str) -> str:
    return urljoin(current_url, href.split("#", 1)[0])


def same_section(url: str, prefix: str) -> bool:
    p = urlparse(url)
    return p.netloc.endswith(".onion") and p.path.startswith(prefix)


def cache_name(url: str) -> str:
    p = urlparse(url)
    name = (p.path.strip("/") or "root").replace("/", "__")
    return name + ".html"


@dataclass
class Page:
    url: str
    soup: BeautifulSoup


class BrowserCrawler:
    def __init__(self, proxy: str, cache_dir: Path, use_cache: bool = True):
        self.proxy = proxy
        self.cache_dir = cache_dir
        self.use_cache = use_cache
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.pages: dict[str, Page] = {}

    async def fetch(self, browser, url: str) -> Page:
        if url in self.pages:
            return self.pages[url]
        cache_file = self.cache_dir / cache_name(url)
        if self.use_cache and cache_file.exists():
            html = cache_file.read_text(encoding="utf-8")
        else:
            page = await browser.new_page()
            try:
                await page.goto(url, wait_until="networkidle", timeout=60_000)
            except PlaywrightTimeoutError:
                # Some onion pages never become perfectly idle; use what rendered.
                await page.wait_for_load_state("domcontentloaded", timeout=20_000)
            html = await page.content()
            await page.close()
            cache_file.write_text(html, encoding="utf-8")
        soup = BeautifulSoup(html, "lxml")
        out = Page(url, soup)
        self.pages[url] = out
        return out

    async def crawl(self, start: str, prefixes: list[str], max_pages: int = 500) -> list[Page]:
        """Breadth-first crawl restricted to path prefixes, e.g. ['/49/cat/home', '/49/p/']."""
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                proxy={"server": self.proxy},
                args=["--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1"],
            )
            seen: set[str] = set()
            todo = [start]
            while todo and len(seen) < max_pages:
                url = todo.pop(0)
                if url in seen:
                    continue
                seen.add(url)
                page = await self.fetch(browser, url)
                for a in page.soup.select("a[href]"):
                    href = a.get("href") or ""
                    nxt = abs_url(url, href)
                    if nxt in seen or nxt in todo:
                        continue
                    path = urlparse(nxt).path
                    if any(path.startswith(prefix) for prefix in prefixes):
                        todo.append(nxt)
            await browser.close()
        return [self.pages[u] for u in seen]


def likely_items(soup: BeautifulSoup, keywords: Iterable[str]) -> list[Tag]:
    """Find repeated cards/rows. We keep this broad because generated challenge HTML may vary."""
    kws = tuple(k.lower() for k in keywords)
    candidates: list[Tag] = []
    for tag in soup.find_all(["article", "li", "tr", "div"]):
        if not isinstance(tag, Tag):
            continue
        blob = " ".join([" ".join(tag.get("class", [])), " ".join(tag.attrs.keys()), clean_text(tag)]).lower()
        if any(k in blob for k in kws):
            candidates.append(tag)
    # Prefer smaller nodes: remove candidates that only wrap several candidate children.
    result = []
    for c in candidates:
        child_hits = [x for x in candidates if x is not c and c in x.parents]
        if len(child_hits) <= 3:
            result.append(c)
    return result or candidates


def attr_int(tag: Tag, names: Iterable[str]) -> int | None:
    for name in names:
        if tag.has_attr(name):
            n = first_number(str(tag.get(name)))
            if n is not None:
                return n
    for child in tag.find_all(True):
        for name in names:
            if child.has_attr(name):
                n = first_number(str(child.get(name)))
                if n is not None:
                    return n
    return None


def attr_text(tag: Tag, names: Iterable[str]) -> str | None:
    for name in names:
        if tag.has_attr(name):
            return str(tag.get(name))
    for child in tag.find_all(True):
        for name in names:
            if child.has_attr(name):
                return str(child.get(name))
    return None


def product_id(tag: Tag, page_url: str) -> str:
    explicit = attr_text(tag, ["data-product-id", "data-id", "id"])
    if explicit:
        return explicit
    a = tag.select_one("a[href]")
    return abs_url(page_url, a["href"]) if a else page_url + "::" + clean_text(tag)[:80]


def parse_products(pages: list[Page]) -> dict[str, dict]:
    products = {}
    for page in pages:
        for item in likely_items(page.soup, ["product", "price", "stock", "rating"]):
            text = clean_text(item)
            if "price" not in text.lower() and "$" not in text and "₹" not in text:
                continue
            pid = product_id(item, page.url)
            # Current price: prefer classes/attrs with current/sale/price.
            current = None
            for sel in ["[data-current-price]", "[data-price]", ".current-price", ".sale-price", ".price"]:
                n = item.select_one(sel)
                if n:
                    current = first_money(str(n.get("data-current-price") or n.get("data-price") or clean_text(n)))
                    if current is not None:
                        break
            if current is None:
                current = first_money(text)

            original = None
            for sel in ["[data-original-price]", ".original-price", ".old-price", "del", "s"]:
                n = item.select_one(sel)
                if n:
                    original = first_money(str(n.get("data-original-price") or clean_text(n)))
                    if original is not None:
                        break
            # Fallback: if two money amounts occur, assume larger/second is original.
            if original is None:
                vals = [Decimal(x.replace(",", "")) for x in MONEY_RE.findall(text)]
                if len(vals) >= 2:
                    original = max(vals)
                    if current is None:
                        current = min(vals)

            stock = attr_int(item, ["data-stock", "aria-stock", "data-inventory"])
            if stock is None:
                m = re.search(r"(?:stock|inventory|qty|quantity)\D*(\d[\d,]*)", text, re.I)
                stock = int(m.group(1).replace(",", "")) if m else None
            if stock is None and re.search(r"out\s+of\s+stock", text, re.I):
                stock = 0

            rating = None
            rt = attr_text(item, ["data-rating", "aria-label"])
            if rt:
                m = RATING_RE.search(rt) or re.search(r"([0-5](?:\.\d+)?)", rt)
                if m:
                    rating = Decimal(m.group(1))
            if rating is None:
                m = RATING_RE.search(text)
                if m:
                    rating = Decimal(m.group(1))

            products[pid] = {"text": text, "current": current, "original": original, "stock": stock, "rating": rating}
    return products


def parse_articles(pages: list[Page]) -> dict[str, dict]:
    articles = {}
    for page in pages:
        for item in likely_items(page.soup, ["article", "views", "author", "category"]):
            views = attr_int(item, ["data-internal-views", "data-views", "aria-internal-views"])
            text = clean_text(item)
            if views is None:
                continue
            aid = attr_text(item, ["data-article-id", "data-id", "id"])
            if not aid:
                a = item.select_one("a[href]")
                aid = abs_url(page.url, a["href"]) if a else page.url + "::" + text[:50]
            # Normalize article_123.html to 123 if possible.
            m = re.search(r"(?:article[_-]?|/a/|id=)([A-Za-z0-9_-]+)", aid)
            shown_id = m.group(1) if m else aid
            articles[aid] = {"id": shown_id, "views": views, "text": text}
    return articles


def count_tiffany_world(pages: list[Page]) -> int:
    count = 0
    seen = set()
    for page in pages:
        for item in likely_items(page.soup, ["article", "world", "tiffany", "category"]):
            text = clean_text(item).lower()
            if "world" in text and ("tiffany black" in text or "author" in text or "by" in text):
                key = attr_text(item, ["data-article-id", "data-id", "id"]) or text[:100]
                if key not in seen:
                    seen.add(key)
                    count += 1
    return count


def parse_users(pages: list[Page]) -> dict[str, dict]:
    users = {}
    for page in pages:
        for item in likely_items(page.soup, ["user", "handle", "followers", "location", "reputation", "badge"]):
            text = clean_text(item)
            low = text.lower()
            if not any(k in low for k in ["@", "followers", "location", "reputation", "joined", "badge"]):
                continue
            handle = attr_text(item, ["data-handle", "data-username", "data-user", "id"])
            if not handle:
                m = re.search(r"@([A-Za-z0-9_\-.]+)", text)
                handle = m.group(1) if m else None
            if not handle:
                a = item.select_one("a[href]")
                if a:
                    handle = clean_text(a).lstrip("@") or a["href"]
            if not handle:
                continue
            followers = attr_int(item, ["data-followers", "aria-followers"])
            if followers is None:
                m = re.search(r"followers?\D*(\d[\d,]*)", text, re.I)
                followers = int(m.group(1).replace(",", "")) if m else None
            reputation = attr_int(item, ["data-reputation", "data-rep", "aria-reputation"])
            if reputation is None:
                m = re.search(r"(?:reputation|rep)\D*(-?\d[\d,]*)", text, re.I)
                reputation = int(m.group(1).replace(",", "")) if m else None
            location = attr_text(item, ["data-location", "aria-location"])
            if location is None:
                m = re.search(r"location\s*:?\s*([A-Za-z ]+?)(?:\s+(?:followers?|joined|reputation|rep|badges?)\b|$)", text, re.I)
                location = m.group(1).strip() if m else None
            users[handle.lstrip("@")] = {"text": text, "followers": followers or 0, "reputation": reputation or 0, "location": location or ""}
    return users


def parse_threads(pages: list[Page]) -> dict[str, dict]:
    threads = {}
    for page in pages:
        for item in likely_items(page.soup, ["thread", "views", "replies"]):
            text = clean_text(item)
            views = attr_int(item, ["data-views", "aria-views"])
            if views is None:
                m = re.search(r"views?\D*(\d[\d,]*)", text, re.I)
                views = int(m.group(1).replace(",", "")) if m else None
            if views is None:
                continue
            tid = attr_text(item, ["data-thread-id", "data-id", "id"])
            if not tid:
                a = item.select_one("a[href]")
                tid = a["href"] if a else text[:80]
            m = re.search(r"(?:thread[_-]?|/t/|id=)([A-Za-z0-9_-]+)", tid)
            shown_id = m.group(1) if m else tid
            threads[tid] = {"id": shown_id, "views": views, "text": text}
    return threads


async def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--proxy", default="socks5://127.0.0.1:9150", help="Tor SOCKS proxy; try socks5://127.0.0.1:9050 for tor daemon")
    ap.add_argument("--cache-dir", default=".onion_cache")
    ap.add_argument("--fresh", action="store_true", help="Ignore cached HTML and fetch again")
    args = ap.parse_args()

    crawler = BrowserCrawler(args.proxy, Path(args.cache_dir), use_cache=not args.fresh)

    # Crawl narrowly so we do not wander outside the assignment site sections.
    home_pages = await crawler.crawl(STARTS["home"], ["/49/cat/home", "/49/product", "/49/p"], 300)
    apparel_pages = await crawler.crawl(STARTS["apparel"], ["/49/cat/apparel", "/49/product", "/49/p"], 300)
    store_pages = await crawler.crawl(STARTS["store"], ["/49/"], 800)
    tech_pages = await crawler.crawl(STARTS["tech"], ["/69/c/tech", "/69/a", "/69/article"], 300)
    business_pages = await crawler.crawl(STARTS["business"], ["/69/c/business", "/69/a", "/69/article"], 300)
    tiffany_pages = await crawler.crawl(STARTS["tiffany"], ["/69/author/author_21", "/69/a", "/69/article"], 300)
    social_pages = await crawler.crawl(STARTS["social"], ["/82/"], 800)
    explore_pages = await crawler.crawl(STARTS["explore"], ["/82/"], 800)
    forum_user_pages = await crawler.crawl(STARTS["forum_users"], ["/6/users", "/6/u"], 800)
    opsec_pages = await crawler.crawl(STARTS["opsec"], ["/6/b/opsec", "/6/t", "/6/thread"], 300)

    home_products = parse_products(home_pages)
    apparel_products = parse_products(apparel_pages)
    store_products = parse_products(store_pages)
    tech_articles = parse_articles(tech_pages)
    business_articles = parse_articles(business_pages)
    social_users = parse_users(social_pages)
    forum_users = parse_users(forum_user_pages)
    opsec_threads = parse_threads(opsec_pages)

    task1_val = sum((p["current"] or Decimal(0)) * Decimal(p["stock"] or 0) for p in home_products.values())
    task2_val = sum(
        1 for p in store_products.values()
        if p["current"] is not None and p["original"] is not None and p["original"] > 0
        and ((p["original"] - p["current"]) / p["original"] > Decimal("0.50"))
    )
    apparel_oos_ratings = [p["rating"] for p in apparel_products.values() if (p["stock"] == 0 or "out of stock" in p["text"].lower()) and p["rating"] is not None]
    task3_val = sum(apparel_oos_ratings, Decimal(0)) / Decimal(len(apparel_oos_ratings)) if apparel_oos_ratings else Decimal(0)
    task4_val = sum(a["views"] for a in tech_articles.values())
    task5_val = count_tiffany_world(tiffany_pages)
    task6_val = max(business_articles.values(), key=lambda x: x["views"])["id"] if business_articles else ""

    port_rodney = [u for u in social_users.items() if "port rodney" in (u[1]["location"] + " " + u[1]["text"]).lower()]
    task7_val = max(port_rodney, key=lambda kv: kv[1]["followers"])[0] if port_rodney else ""

    # Posts containing #ai can appear on explore and linked post pages. Deduplicate by post id/text.
    ai_likes = {}
    for page in explore_pages:
        for item in likely_items(page.soup, ["#ai", "likes", "post"]):
            text = clean_text(item)
            if "#ai" not in text.lower():
                continue
            likes = attr_int(item, ["data-likes", "aria-likes"])
            if likes is None:
                m = re.search(r"likes?\D*(\d[\d,]*)", text, re.I)
                likes = int(m.group(1).replace(",", "")) if m else 0
            pid = attr_text(item, ["data-post-id", "data-id", "id"]) or text[:120]
            ai_likes[pid] = likes or 0
    task8_val = sum(ai_likes.values())

    task9_val = sum(1 for u in social_users.values() if "port johnburgh" in (u["location"] + " " + u["text"]).lower())

    task10_val = sum(u["reputation"] for u in forum_users.values() if DATE_JUNE_2025_RE.search(u["text"]))
    task11_val = max(opsec_threads.values(), key=lambda x: x["views"])["id"] if opsec_threads else ""
    task12_val = sum(u["reputation"] for u in forum_users.values() if "vendor" in u["text"].lower())

    result = {
        "task1": q2(task1_val),
        "task2": str(task2_val),
        "task3": q2(task3_val),
        "task4": str(task4_val),
        "task5": str(task5_val),
        "task6": str(task6_val),
        "task7": str(task7_val).lstrip("@"),
        "task8": str(task8_val),
        "task9": str(task9_val),
        "task10": str(task10_val),
        "task11": str(task11_val),
        "task12": str(task12_val),
    }
    print(json.dumps(result, indent=2))

    print("\nDebug counts:")
    print(json.dumps({
        "home_products": len(home_products),
        "apparel_products": len(apparel_products),
        "store_products": len(store_products),
        "tech_articles": len(tech_articles),
        "business_articles": len(business_articles),
        "social_users": len(social_users),
        "forum_users": len(forum_users),
        "opsec_threads": len(opsec_threads),
    }, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
