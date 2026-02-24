# Question 16 - IMDb Titles with Rating 5 to 7

This solution fetches up to the first 25 movie titles from IMDb's advanced title search backend and outputs JSON with:

- `id`
- `title`
- `year`
- `rating`

## Files

- `main.py` - Fetches IMDb data and prints JSON.

## Run

```bash
cd "Question 16"
uv run main.py
```

If `uv` is not available:

```bash
python3 main.py
```

## Output format

```json
[
  { "id": "tt1234567", "title": "Movie", "year": "2024", "rating": "6.1" }
]
```
