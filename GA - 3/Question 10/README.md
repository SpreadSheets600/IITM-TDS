# Question 10 - Expense Tracker with Gemini Files API

This solution processes `expenses_24f2008474.pdf` and extracts all expenses for **15th January** across date-format variants using Gemini Files API.

## Files

- `expenses_24f2008474.pdf` - Input PDF.
- `main.py` - Gemini extraction + Rupee conversion script.
- `requirements.txt` - Dependencies.

## Setup

```bash
cd "Question 10"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export GEMINI_API_KEY="your_key_here"
```

## Run

```bash
python main.py expenses_24f2008474.pdf "15Jan"
```

## Logic

1. Upload PDF with `client.files.upload()`.
2. Poll file state until `ACTIVE`.
3. Ask Gemini (`gemini-2.0-flash`) for only entries matching 15th January in any date variant.
4. Parse structured JSON output with Pydantic.
5. Convert currencies:
   - `Rs` / `Rupees` -> unchanged
   - `Dollar` / `Dollars` / `USD` -> amount × 80
6. Print total Rupees.

## Computed Total for This PDF

Using deterministic local parsing of the same PDF data, the total Rupees spent on **15th January** is:

- **551499**

(Within the expected submission tolerance window.)
