# Question 11 - Attendee Extraction from Check-in Video

This solution uploads the generated check-in video to Gemini Files API and extracts attendee `name` + `date` pairs using structured JSON output.

## Files

- `main.py` - Video upload + Gemini extraction script.
- `requirements.txt` - Dependencies.

## Setup

```bash
cd "Question 11"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export GEMINI_API_KEY="your_key_here"
```

## Run

```bash
python main.py attendee_checkin.webm
```

## Output format

`main.py` prints:

```json
[
  {"name": "Alice Smith", "date": "03/07/2025"},
  {"name": "Benjamin Patel", "date": "21/11/2024"}
]
```

Dates are schema-constrained to `dd/mm/yyyy`.

## Notes

- The script polls file state until `ACTIVE` before analysis.
- Temporary uploaded file is deleted from Gemini Files API after extraction.
