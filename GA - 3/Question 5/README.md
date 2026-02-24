# Question 5 - CI/CD Visibility

Repository URL:
- https://github.com/SpreadSheets600/IITM-TDS

## What was added

1. GitHub Actions workflow:
   - `.github/workflows/ci.yml`
2. Repository-level README with status badge:
   - `README.md`

## Workflow details

- Workflow name: `CI`
- Triggers:
  - Push to `master`
  - Pull request to `master`
  - Manual run (`workflow_dispatch`)
- Job:
  - Runs on `ubuntu-latest`
  - Checks out code
  - Sets up Python 3.11
  - Executes a simple pass step (`python -V`)

## Badge added to README

```md
[![CI](https://github.com/SpreadSheets600/IITM-TDS/actions/workflows/ci.yml/badge.svg)](https://github.com/SpreadSheets600/IITM-TDS/actions/workflows/ci.yml)
```

## How to verify green checkmark

1. Commit and push these files:
   ```bash
   git add .github/workflows/ci.yml README.md "Question 5/README.md"
   git commit -m "feat: add CI workflow and README status badge for question 5"
   git push origin master
   ```
2. Open:
   - `https://github.com/SpreadSheets600/IITM-TDS/actions`
3. Confirm latest `CI` run is successful (green checkmark).
4. Confirm badge is visible in repository `README.md`.
