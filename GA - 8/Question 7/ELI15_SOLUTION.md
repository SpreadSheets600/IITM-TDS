# Question 7 — ELI15 Step-by-step Solution

## What you must submit

You must submit this format:

```text
ruff 0.4.4|https://github.com/YOUR_USERNAME/YOUR_REPO/actions/runs/PASSING_RUN_ID
```

Example:

```text
ruff 0.4.4|https://github.com/SpreadSheets600/tds-q7-ruff-ci/actions/runs/123456789
```

Important: the URL must be a **successful GitHub Actions run from a pull request**.

---

## What are we building?

We are proving two things:

1. **Local quality check** using pre-commit hooks.
2. **GitHub quality check** using GitHub Actions CI.

Think of it like two guards:

- Pre-commit is the guard on your laptop.
- CI is the guard on GitHub.

Both guards check your Python code with `ruff`.

---

## Step 1: Create a public GitHub repository

Create a new public GitHub repo, for example:

```text
tds-q7-ruff-ci
```

Clone it:

```bash
git clone https://github.com/YOUR_USERNAME/tds-q7-ruff-ci.git
cd tds-q7-ruff-ci
```

Create a small Python file:

```bash
cat > main.py <<'PY'
def main():
    print("Hello, ruff CI!")


if __name__ == "__main__":
    main()
PY
```

Commit it:

```bash
git add main.py
git commit -m "Add initial Python file"
git push origin main
```

---

## Step 2: Add `.pre-commit-config.yaml`

Create this file:

```bash
cat > .pre-commit-config.yaml <<'YAML'
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.4
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-merge-conflict
YAML
```

This tells pre-commit to run:

- `ruff`
- `ruff-format`
- whitespace checks
- YAML checks
- merge conflict checks

---

## Step 3: Add GitHub Actions workflow

Create the workflow folder:

```bash
mkdir -p .github/workflows
```

Create this file:

```bash
cat > .github/workflows/ruff-ci.yml <<'YAML'
name: ruff-ci
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install ruff
        run: pip install ruff==0.4.4
      - name: Run ruff check and format
        run: ruff check . && ruff format --check .
YAML
```

This is the GitHub CI gate.

It runs only on pull requests because of:

```yaml
on: [pull_request]
```

The grader will check that your workflow contains:

```bash
ruff check .
ruff format --check .
```

and:

```bash
pip install ruff==0.4.4
```

---

## Step 4: Commit the config files to main

```bash
git add .pre-commit-config.yaml .github/workflows/ruff-ci.yml
git commit -m "Add ruff pre-commit and CI"
git push origin main
```

---

## Step 5: Install local tools

Run:

```bash
pip install pre-commit ruff==0.4.4
pre-commit install
```

Check the version:

```bash
ruff --version
```

It must say:

```text
ruff 0.4.4
```

---

## Step 6: Create a new branch

```bash
git checkout -b feature/add-analysis
```

---

## Step 7: Add a bad file first

Create `analysis.py` with deliberate mistakes:

```bash
cat > analysis.py <<'PY'
import os
import sys
import math  

unused_value = 123


def analyze_number(value: float):    
    return math.sqrt(value)
PY
```

This file has problems:

- unused imports: `os`, `sys`
- trailing whitespace
- maybe formatting issues

Commit it:

```bash
git add analysis.py
git commit -m "Add analysis with lint issues" --no-verify
```

We use `--no-verify` only here so the bad code can be committed and the PR can fail first.

Push the branch:

```bash
git push -u origin feature/add-analysis
```

Open a PR:

```bash
gh pr create --base main --head feature/add-analysis --title "Add analysis" --body "Testing ruff CI gate"
```

The GitHub Actions run should fail red ❌.

---

## Step 8: Fix the file

Replace `analysis.py` with clean code:

```bash
cat > analysis.py <<'PY'
import math


def analyze_number(value: float) -> dict[str, float]:
    square_root = math.sqrt(value)
    doubled = value * 2
    return {"square_root": square_root, "doubled": doubled}
PY
```

Now run pre-commit locally:

```bash
pre-commit run --all-files
```

If it changes files, add those changes:

```bash
git add .
git commit -m "Fix ruff violations"
git push
```

Now the PR workflow should pass green ✅.

---

## Step 9: Get the successful workflow run URL

Go to your repo on GitHub:

```text
https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

Click the successful `ruff-ci` run from your PR.

Copy the URL. It should look like:

```text
https://github.com/YOUR_USERNAME/YOUR_REPO/actions/runs/123456789
```

---

## Final answer format

Submit:

```text
ruff 0.4.4|https://github.com/YOUR_USERNAME/YOUR_REPO/actions/runs/PASSING_RUN_ID
```

Do not submit the PR URL. Submit the **Actions run URL**.
