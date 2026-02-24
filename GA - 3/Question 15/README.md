# Question 15 - Crawl HTML and Count Files (O to Y)

This solution crawls `https://sanand0.github.io/tdsdata/crawl_html/` recursively and counts how many discovered `.html` filenames begin with letters from `O` to `Y` (inclusive).

## Why this fix

Your earlier version used Selenium + ChromeDriver, which failed with:

- `chromedriver unexpectedly exited. Status code was: 127`

This updated script uses only Python standard library (`urllib`, `html.parser`) and does not require Chrome/Chromedriver.

## Run

```bash
cd "Question 15"
uv run main.py
```

## Output

The script prints:

- `Visited URLs: <n>`
- `HTML pages discovered: <n>`
- `Files starting with O–Y: <count>`

Use the final `Files starting with O–Y` value as your answer.
