# Question 16 - IMDb Titles (Rating 5 to 7)

This script extracts up to the first 25 titles from IMDb search with rating range `5..7` and prints JSON in this exact shape:

- `id` (e.g. `tt1234567`)
- `title` (numbered, e.g. `1. Movie Name`)
- `year` (keeps IMDb style, including ongoing series format like `2026– `)
- `rating` (string with one decimal place, e.g. `6.3`)

## Strategy

1. Try IMDb GraphQL (`advancedTitleSearch`) for stable fields.
2. If GraphQL fails, use regex-based scraping on `https://www.imdb.com/search/title/?user_rating=5,7&count=25`.

This avoids brittle DOM selector failures such as:
`querySelector(...) is null`.

## Run

```bash
cd "Question 16"
python3 main.py
```

or

```bash
uv run main.py
```
