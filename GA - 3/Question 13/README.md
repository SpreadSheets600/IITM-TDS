# Question 13 - Automated QA with Playwright and GitHub Actions

This solution runs a Playwright script in GitHub Actions, visits seed pages `70` to `79`, extracts all numbers from all HTML tables, and prints the final total in workflow logs as:

```text
FINAL_TOTAL=<number>
```

## Files

- `Question 13/sum_tables.js` - Playwright scraper and numeric sum logic.
- `Question 13/package.json` - Node dependencies and run script.
- `.github/workflows/question13-playwright.yml` - GitHub Action workflow.

## How the scraper works

1. Builds URLs for seeds `70..79` using `SEED_URL_TEMPLATE`.
2. Opens each page in headless Chromium.
3. Reads every `<table>` element.
4. Extracts numeric values (supports integers and decimals).
5. Sums page totals into one grand total.
6. Prints seed-wise totals and `FINAL_TOTAL=<value>`.

## Required configuration

Set a GitHub Repository Secret named:

- `SEED_URL_TEMPLATE`

Value example:

```text
https://example.com/table?seed={seed}
```

Use the exact URL pattern for your assignment links. The placeholder `{seed}` is replaced by `70`..`79`.

## Run locally

```bash
cd "Question 13"
npm install
npx playwright install --with-deps chromium
SEED_URL_TEMPLATE="https://example.com/table?seed={seed}" node sum_tables.js
```

## Run in GitHub Actions

1. Commit and push these files.
2. In GitHub repository settings, add secret `SEED_URL_TEMPLATE`.
3. Go to `Actions` tab.
4. Run workflow: `Question 13 - Playwright Table Sum` (or trigger by push).
5. Open the run logs and find `FINAL_TOTAL=...`.

## Submission notes

- The workflow includes the required step name containing:
  - `24f2008474@ds.study.iitm.ac.in`
- Do **not** share your Personal Access Token publicly.
- Submit your repository URL and token only in the official private submission field.
