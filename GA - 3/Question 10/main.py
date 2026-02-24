import json
import os
import time
from typing import List

from google import genai
from google.genai import types
from pydantic import BaseModel, Field


class ExpenseEntry(BaseModel):
    raw_date: str = Field(..., description="Original date text from PDF")
    amount: float = Field(..., ge=0)
    currency: str = Field(..., description="One of Rs, Rupees, Dollar, Dollars, USD")


class ExtractedExpenses(BaseModel):
    entries: List[ExpenseEntry]


def wait_until_active(client: genai.Client, file_name: str, timeout_seconds: int = 300):
    start = time.time()
    while True:
        f = client.files.get(name=file_name)
        state = getattr(getattr(f, "state", None), "name", "").upper()
        if state == "ACTIVE":
            return f
        if state == "FAILED":
            raise RuntimeError("Gemini failed to process uploaded file.")
        if time.time() - start > timeout_seconds:
            raise TimeoutError("Timed out waiting for uploaded file to become ACTIVE.")
        time.sleep(2)


def to_rupees(amount: float, currency: str) -> float:
    c = currency.strip().lower()
    if c in {"rs", "rupees"}:
        return amount
    if c in {"dollar", "dollars", "usd"}:
        return amount * 80
    raise ValueError(f"Unsupported currency: {currency}")


def main(pdf_path: str, target_date: str = "15Jan"):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set.")

    client = genai.Client(api_key=api_key)
    uploaded = None

    try:
        uploaded = client.files.upload(file=pdf_path)
        active_file = wait_until_active(client, uploaded.name)

        prompt = f"""
Extract every expense entry from this PDF whose date is 15th January in ANY format variant.
Examples of valid variants: 15Jan, Jan15, January 15, 15JAN, 15January, Jan 15.

Return ONLY JSON matching schema with:
- entries: array of objects
  - raw_date: exact date text as appears in entry
  - amount: numeric amount
  - currency: one of Rs, Rupees, Dollar, Dollars, USD

Important:
- Scan all pages.
- Do not include non-15th-Jan entries.
""".strip()

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[active_file, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ExtractedExpenses,
                temperature=0,
            ),
        )

        parsed = ExtractedExpenses.model_validate_json(response.text)

        total_rs = sum(to_rupees(e.amount, e.currency) for e in parsed.entries)

        output = {
            "target_date": target_date,
            "entry_count": len(parsed.entries),
            "total_rupees": total_rs,
            "entries": [e.model_dump() for e in parsed.entries],
        }
        print(json.dumps(output, indent=2))

    finally:
        if uploaded is not None:
            try:
                client.files.delete(name=uploaded.name)
            except Exception:
                pass


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        raise SystemExit("Usage: python main.py <pdf_path> [target_date]")

    pdf = sys.argv[1]
    date = sys.argv[2] if len(sys.argv) > 2 else "15Jan"
    main(pdf, date)
