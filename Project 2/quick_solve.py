import asyncio
import json
import re
from decimal import ROUND_HALF_UP, Decimal
from pathlib import Path
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

BASE = "http://tds26vu3ptapxx6igo6n26kuwfpn2l5omkmagc4hc7g7yn2o3xb25syd.onion"
CACHE = Path(".cache2")
CACHE.mkdir(exist_ok=True)


def cname(url):
    p = urlparse(url)
    return (p.path.strip("/") or "root").replace("/", "__") + ".html"


async def fetch(ctx, url):
    f = CACHE / cname(url)
    if f.exists():
        return f.read_text(), url
    page = await ctx.new_page()
    for i in range(3):
        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=120000)
            await page.wait_for_timeout(500)
            html = await page.content()
            f.write_text(html)
            await page.close()
            print("fetched", url)
            return html, url
        except Exception as e:
            print("ERR", i, url, e)
    await page.close()
    raise RuntimeError(url)


def soup(html):
    return BeautifulSoup(html, "lxml")


def txt(x):
    return " ".join(x.get_text(" ", strip=True).split()) if x else ""


def money(el):
    if not el:
        return None
    raw = el.get("data-raw-price") or el.get("data-price") or txt(el)
    m = re.search(r"(\d[\d,]*(?:\.\d+)?)", raw)
    return Decimal(m.group(1).replace(",", "")) if m else None


def rating(container):
    r = container.select_one(".rating-strip[aria-label]")
    if r:
        m = re.search(r"Rated\s+([0-5](?:\.\d+)?)", r["aria-label"])
        if m:
            return Decimal(m.group(1))
    return None


async def crawl_pages(ctx, start, allowed_prefix):
    seen = []
    todo = [start]
    while todo:
        u = todo.pop(0)
        if u in seen:
            continue
        html, _ = await fetch(ctx, u)
        seen.append(u)
        s = soup(html)
        for a in s.select("a[href]"):
            v = urljoin(u, a["href"].split("#")[0])
            if (
                urlparse(v).path.startswith(allowed_prefix)
                and v not in seen
                and v not in todo
            ):
                todo.append(v)
    return [(u, soup((CACHE / cname(u)).read_text())) for u in seen]


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True, proxy={"server": "socks5://127.0.0.1:9150"}
        )
        ctx = await browser.new_context()
        # Crawl list pages only for each section; product/article/profile/thread links fetched separately as needed
        sections = {}
        for name, start, prefix in [
            ("home", BASE + "/49/cat/home/index.html", "/49/cat/home"),
            ("apparel", BASE + "/49/cat/apparel/index.html", "/49/cat/apparel"),
            ("store", BASE + "/49/index.html", "/49/"),
            ("tech", BASE + "/69/c/tech/index.html", "/69/c/tech"),
            ("business", BASE + "/69/c/business/index.html", "/69/c/business"),
            ("tiffany", BASE + "/69/author/author_21.html", "/69/author/author_21"),
            ("social", BASE + "/82/index.html", "/82/"),
            ("explore", BASE + "/82/explore.html", "/82/"),
            ("forum_users", BASE + "/6/users/index.html", "/6/users"),
            ("opsec", BASE + "/6/b/opsec/index.html", "/6/b/opsec"),
        ]:
            print("crawl", name)
            sections[name] = await crawl_pages(ctx, start, prefix)

        # ecommerce products: collect links from category/store pages, fetch product details
        async def product_links(pages):
            links = []
            for u, s in pages:
                for a in s.select("a.p-link[href], .card-title a[href]"):
                    v = urljoin(u, a["href"])
                    if "/49/p/" in v and v not in links:
                        links.append(v)
            return links

        async def parse_products(pages):
            links = await product_links(pages)
            out = {}
            for u in links:
                html, _ = await fetch(ctx, u)
                s = soup(html)
                d = s.select_one(".p-detail") or s
                sku = re.search(r"SM-[A-Z]+-\d+", txt(d))
                sku = sku.group(0) if sku else u
                cat = txt(d.select_one(".p-info > div")).lower()
                cur = money(d.select_one(".current-price"))
                old = money(d.select_one(".old-price"))
                if not old:
                    vals = [
                        Decimal(x.replace(",", ""))
                        for x in re.findall(r"\$\s*(\d[\d,]*(?:\.\d+)?)", txt(d))
                    ]
                    old = max(vals) if len(vals) > 1 else cur
                stock = 0 if re.search("out of stock", txt(d), re.I) else None
                sd = s.select_one("#__SERVER_DATA")
                if sd:
                    m = re.search(
                        r'"inventory_level"\s*:\s*(\d+)', sd.string or sd.text
                    )
                    if m:
                        stock = int(m.group(1))
                out[sku] = {
                    "cat": cat,
                    "current": cur,
                    "original": old,
                    "stock": stock or 0,
                    "rating": rating(d),
                    "text": txt(d),
                }
            return out

        home = await parse_products(sections["home"])
        apparel = await parse_products(sections["apparel"])
        store = await parse_products(sections["store"])

        # news parse cards on list pages and maybe article pages not needed
        def articles(pages):
            out = []
            for u, s in pages:
                for art in s.select("[data-internal-views]"):
                    # choose closest article/card
                    item = art
                    for parent in art.parents:
                        if getattr(parent, "name", None) in [
                            "article",
                            "div",
                            "li",
                            "tr",
                        ] and (
                            parent.get("data-article-id")
                            or parent.get("id")
                            or parent.select_one("a[href]")
                        ):
                            item = parent
                            break
                    views = int(
                        re.search(r"\d+", art.get("data-internal-views") or "").group()
                    )
                    aid = (
                        item.get("data-article-id")
                        or art.get("data-article-id")
                        or item.get("id")
                        or ""
                    )
                    href = item.select_one("a[href]")
                    if not aid and href:
                        aid = href["href"]
                    m = re.search(r"(?:article[_/-]?|a/)([A-Za-z0-9_-]+)", aid)
                    shown = m.group(1) if m else aid
                    key = shown + str(views)
                    if key not in [x.get("key") for x in out]:
                        out.append(
                            {"key": key, "id": shown, "views": views, "text": txt(item)}
                        )
            return out

        tech = articles(sections["tech"])
        bus = articles(sections["business"])
        tif = articles(sections["tiffany"])

        # social users and posts
        def users(pages):
            out = {}
            for u, s in pages:
                for card in s.select(
                    "[data-location], [data-followers], .user-card, article, .card"
                ):
                    t = txt(card)
                    if "followers" not in t.lower() and not card.get("data-followers"):
                        continue
                    h = card.get("data-handle") or card.get("data-username")
                    if not h:
                        m = re.search(r"@([\w.-]+)", t)
                        h = m.group(1) if m else None
                    if not h:
                        continue
                    loc = card.get("data-location") or ""
                    fol = card.get("data-followers") or ""
                    if not fol:
                        m = re.search(r"followers?\D*(\d[\d,]*)", t, re.I)
                        fol = m.group(1) if m else "0"
                    out[h.lstrip("@")] = {
                        "text": t,
                        "location": loc,
                        "followers": int(str(fol).replace(",", "")),
                    }
            return out

        social = users(sections["social"])
        ai = {}
        for u, s in sections["explore"]:
            for post in s.select("[data-likes], .post, article, .card"):
                t = txt(post)
                if "#ai" not in t.lower():
                    continue
                likes = post.get("data-likes")
                if not likes:
                    m = re.search(r"likes?\D*(\d[\d,]*)", t, re.I)
                    likes = m.group(1) if m else "0"
                pid = post.get("data-post-id") or post.get("id") or t[:100]
                ai[pid] = int(str(likes).replace(",", ""))
        # forum users
        fusers = {}
        for u, s in sections["forum_users"]:
            for card in s.select("[data-reputation], .user-card, tr, article, .card"):
                t = txt(card)
                if (
                    "reputation" not in t.lower()
                    and "rep" not in t.lower()
                    and not card.get("data-reputation")
                ):
                    continue
                rep = card.get("data-reputation") or card.get("data-rep")
                if not rep:
                    m = re.search(r"(?:reputation|rep)\D*(-?\d[\d,]*)", t, re.I)
                    rep = m.group(1) if m else "0"
                uid = card.get("data-user-id") or card.get("id") or t[:80]
                fusers[uid] = {"text": t, "rep": int(str(rep).replace(",", ""))}
        # threads
        threads = []
        for u, s in sections["opsec"]:
            for card in s.select("[data-views], .thread, tr, article, .card"):
                t = txt(card)
                if "views" not in t.lower() and not card.get("data-views"):
                    continue
                v = card.get("data-views")
                if not v:
                    m = re.search(r"views?\D*(\d[\d,]*)", t, re.I)
                    v = m.group(1) if m else None
                if not v:
                    continue
                tid = (
                    card.get("data-thread-id")
                    or card.get("data-id")
                    or card.get("id")
                    or (card.select_one("a[href]") or {}).get("href", "")
                )
                m = re.search(r"(?:thread[_/-]?|t/)([A-Za-z0-9_-]+)", tid)
                shown = m.group(1) if m else tid
                threads.append(
                    {"id": shown, "views": int(str(v).replace(",", "")), "text": t}
                )
        res = {
            "task1": str(
                sum(p["current"] * Decimal(p["stock"]) for p in home.values()).quantize(
                    Decimal("0.01"), rounding=ROUND_HALF_UP
                )
            ),
            "task2": str(
                sum(
                    1
                    for p in store.values()
                    if p["original"]
                    and p["current"]
                    and p["original"] > 0
                    and (p["original"] - p["current"]) / p["original"] > Decimal("0.50")
                )
            ),
            "task3": str(
                (
                    sum(
                        [
                            p["rating"]
                            for p in apparel.values()
                            if p["stock"] == 0 and p["rating"] is not None
                        ],
                        Decimal(0),
                    )
                    / Decimal(
                        len(
                            [
                                p
                                for p in apparel.values()
                                if p["stock"] == 0 and p["rating"] is not None
                            ]
                        )
                    )
                ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            ),
            "task4": str(sum(a["views"] for a in tech)),
            "task5": str(
                sum(
                    1
                    for a in tif
                    if "world" in a["text"].lower()
                    and "tiffany black" in a["text"].lower()
                )
            ),
            "task6": max(bus, key=lambda x: x["views"])["id"],
            "task7": max(
                [
                    (h, u)
                    for h, u in social.items()
                    if "port rodney" in (u["location"] + " " + u["text"]).lower()
                ],
                key=lambda x: x[1]["followers"],
            )[0],
            "task8": str(sum(ai.values())),
            "task9": str(
                sum(
                    1
                    for u in social.values()
                    if "port johnburgh" in (u["location"] + " " + u["text"]).lower()
                )
            ),
            "task10": str(
                sum(
                    u["rep"]
                    for u in fusers.values()
                    if re.search(
                        r"\b(?:June|Jun)\s+\d{1,2},?\s+2025\b|\b2025-06-\d{2}\b",
                        u["text"],
                        re.I,
                    )
                )
            ),
            "task11": max(threads, key=lambda x: x["views"])["id"],
            "task12": str(
                sum(u["rep"] for u in fusers.values() if "vendor" in u["text"].lower())
            ),
        }
        print(json.dumps(res, indent=2))
        print(
            "counts",
            {
                k: len(v)
                for k, v in [
                    ("home", home),
                    ("apparel", apparel),
                    ("store", store),
                    ("tech", tech),
                    ("bus", bus),
                    ("tif", tif),
                    ("social", social),
                    ("ai", ai),
                    ("fusers", fusers),
                    ("threads", threads),
                ]
            },
        )
        await browser.close()


asyncio.run(main())
