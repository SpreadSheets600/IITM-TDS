# ELI15 Solver Guide: Onion Site Scraping Challenge

This folder contains a Python solver:

- `solve_onion_assignment.py`

It opens the assignment pages through Tor, follows pagination/links, reads both visible text and hidden HTML attributes like `data-internal-views`, calculates all 12 answers, and prints the required JSON.

---

## Big picture, explained simply

Imagine the website is a book with many pages.

Each task asks you to find numbers from many pages, not just the first page. The solver does this:

1. **Uses Tor as the doorway** to open `.onion` pages.
2. **Uses a browser engine** so JavaScript-rendered pages become normal HTML.
3. **Walks through links** like category pages, profile pages, and pagination.
4. **Reads product/article/user/thread cards** from the HTML.
5. **Extracts numbers** such as price, stock, rating, views, followers, likes, reputation.
6. **Does the math** for each task.
7. **Prints JSON** with keys `task1` to `task12`.

---

## Step 1: Start Tor

Install and open Tor Browser:

<https://www.torproject.org/download/>

Keep Tor Browser running while the Python script runs.

Usually Tor Browser exposes this proxy:

```bash
socks5://127.0.0.1:9150
```

If you use the separate `tor` daemon instead of Tor Browser, the proxy is often:

```bash
socks5://127.0.0.1:9050
```

---

## Step 2: Install Python packages

Run:

```bash
python3 -m pip install playwright beautifulsoup4 lxml
python3 -m playwright install chromium
```

What these do:

- `playwright`: opens the site like a real browser.
- `beautifulsoup4`: reads the HTML easily.
- `lxml`: makes BeautifulSoup faster.

---

## Step 3: Run the solver

With Tor Browser open:

```bash
python3 solve_onion_assignment.py
```

If that cannot connect, try the Tor daemon port:

```bash
python3 solve_onion_assignment.py --proxy socks5://127.0.0.1:9050
```

If you want to force a fresh download instead of using cached pages:

```bash
python3 solve_onion_assignment.py --fresh
```

---

## Step 4: Submit the JSON

The script prints something like:

```json
{
  "task1": "12345.67",
  "task2": "8",
  "task3": "4.25",
  "task4": "9999",
  "task5": "3",
  "task6": "article_123",
  "task7": "somehandle",
  "task8": "4567",
  "task9": "12",
  "task10": "345",
  "task11": "thread_999",
  "task12": "777"
}
```

Copy only the JSON object into the answer box.

---

## What each task means in simple words

### Task 1

For every product in the `home` category:

```text
inventory value = current_price × stock
```

Then add all inventory values together and round to 2 decimals.

### Task 2

Across the whole store, count products where:

```text
(original_price - current_price) / original_price > 0.50
```

That means the discount is more than 50%.

### Task 3

In the `apparel` category, look only at products that are `Out of Stock`.
Average their ratings and round to 2 decimals.

### Task 4

In the news `tech` category, add every article's hidden `data-internal-views` value.

### Task 5

Count how many `world` category articles were written by `Tiffany Black`.

### Task 6

In the news `business` category, find the article with the largest hidden internal views number. Return its article ID.

### Task 7

Among social users located in `Port Rodney`, find the one with the most followers. Return the handle without `@`.

### Task 8

For every post containing hashtag `#ai`, add the likes.

### Task 9

Count registered users located in `Port Johnburgh`.

### Task 10

For forum users who joined in `June 2025`, add their reputation values.

### Task 11

In the forum `opsec` board, find the thread with the most views. Return its thread ID.

### Task 12

For every forum user with the `Vendor` badge, add their reputation values.

---

## If the output looks wrong

Check the debug counts printed after the JSON. If a count is `0`, the HTML structure may be different from what the generic parser expected.

Example:

```json
{
  "home_products": 0,
  "tech_articles": 0
}
```

That means the script reached the site but did not recognize the cards. Open the saved files in `.onion_cache/` and inspect the class names/attributes. Then adjust the matching logic in `solve_onion_assignment.py`.

Important places to edit:

- `parse_products()` for product cards
- `parse_articles()` for news articles
- `parse_users()` for social/forum user cards
- `parse_threads()` for forum threads

---

## Safety reminder

Use this only on the authorized assignment site. Do not scrape random websites or real dark-web services without permission.
