import json
import os
import time
from typing import List

from google import genai
from google.genai import types
from pydantic import BaseModel, Field


class Attendee(BaseModel):
    name: str = Field(..., min_length=1)
    date: str = Field(..., pattern=r"^\d{2}/\d{2}/\d{4}$")


class AttendeeList(BaseModel):
    attendees: List[Attendee]


def wait_until_active(client: genai.Client, file_name: str, timeout_seconds: int = 600):
    start = time.time()
    while True:
        f = client.files.get(name=file_name)
        state = getattr(getattr(f, "state", None), "name", "").upper()
        if state == "ACTIVE":
            return f
        if state == "FAILED":
            raise RuntimeError("Gemini file processing failed.")
        if time.time() - start > timeout_seconds:
            raise TimeoutError("Timed out waiting for uploaded video to become ACTIVE.")
        time.sleep(2)


def extract_attendees(video_path: str, model: str = "gemini-2.0-flash") -> List[dict]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set.")

    client = genai.Client(api_key=api_key)
    uploaded = None

    try:
        uploaded = client.files.upload(file=video_path)
        active = wait_until_active(client, uploaded.name)

        prompt = (
            "Extract all attendee check-in entries visible in this video. "
            "Return exactly the attendee name and registration date for each entry. "
            "Date must be in dd/mm/yyyy format. "
            "Return JSON only."
        )

        response = client.models.generate_content(
            model=model,
            contents=[active, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AttendeeList,
                temperature=0,
            ),
        )

        parsed = AttendeeList.model_validate_json(response.text)
        return [item.model_dump() for item in parsed.attendees]

    finally:
        if uploaded is not None:
            try:
                client.files.delete(name=uploaded.name)
            except Exception:
                pass


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        raise SystemExit("Usage: python main.py <attendee_checkin.webm>")

    result = extract_attendees(sys.argv[1])
    print(json.dumps(result, indent=2))
