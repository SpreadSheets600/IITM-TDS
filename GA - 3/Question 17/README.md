# Question 17 - Structured Data Extraction with Schema Validation

This solution extracts customer review data from unstructured text, validates against JSON Schema, retries extraction on failure, and returns confidence and error logs.

## Files

- `main.py` - LLM extraction + schema validation + retry/error handling.
- `requirements.txt` - Python dependencies.

## Schema

Required:
- `rating` (number, 0 to 5)
- `product` (string)
- `pros` (array of strings)

Optional:
- `cons` (array of strings)
- `recommendation` (string)

## Setup

```bash
cd "Question 17"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment

Set either:

```bash
export NVIDIA_API_KEY="<your_token>"
# OR
export AIPIPE_TOKEN="<your_token>"
```

The script uses OpenAI Python SDK with NVIDIA-compatible endpoint:
- `https://integrate.api.nvidia.com/v1`

## Run

```bash
python3 main.py
```

Or provide custom input text:

```bash
python3 main.py "Rating: 3/5. Product: Phone Z. Pros: Camera, display. Cons: Heating"
```

## Output

Returns JSON:
- `schema`
- `extracted`
- `validated`
- `confidence`
- `errors`
- `retryCount`
- `model`

Retry policy:
- Up to 2 retries (`max attempts = 3`).
- If LLM call fails, fallback extractor is used.
