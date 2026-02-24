import os
import re
import sys
import time
import tempfile
import subprocess
from pathlib import Path

from google import genai
from dotenv import load_dotenv
from google.genai import types
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Smart Video Search API",
    description="Find when a topic is first spoken in a YouTube video.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow All Origins
    allow_methods=["*"],  # Allow All Methods
    allow_headers=["*"],  # Allow All Headers
    allow_credentials=True,
)


class AskRequest(BaseModel):
    video_url: str = Field(..., description="YouTube video URL")
    topic: str = Field(..., min_length=1, description="Spoken phrase/topic to locate")


class AskResponse(BaseModel):
    timestamp: str = Field(..., pattern=r"^\d{2}:\d{2}:\d{2}$")
    video_url: str
    topic: str


class TimestampOnly(BaseModel):
    timestamp: str = Field(..., pattern=r"^\d{2}:\d{2}:\d{2}$")


def download_audio_only(video_url: str) -> str:
    """Download YouTube audio-only track and return local file path."""
    tmp_dir = tempfile.mkdtemp(prefix="q7_audio_")
    output_template = str(Path(tmp_dir) / "audio.%(ext)s")

    # Prefer native yt-dlp binary; fall back to python module if binary is not executable.
    base_cmd = [
        "-f",
        "bestaudio[ext=m4a]/bestaudio",
        "-o",
        output_template,
        video_url,
    ]

    commands = [
        ["yt-dlp", *base_cmd],
        [sys.executable, "-m", "yt_dlp", *base_cmd],
    ]

    completed = None
    last_error = None
    for cmd in commands:
        try:
            completed = subprocess.run(cmd, capture_output=True, text=True)
            if completed.returncode == 0:
                break
            last_error = completed.stderr.strip() or completed.stdout.strip()
        except OSError as exc:
            last_error = str(exc)

    if completed is None or completed.returncode != 0:
        raise RuntimeError(f"yt-dlp failed: {last_error or 'unknown error'}")

    files = list(Path(tmp_dir).glob("audio.*"))
    if not files:
        raise RuntimeError("Audio file was not created by yt-dlp.")

    return str(files[0])


def wait_until_file_active(
    client: genai.Client, file_name: str, timeout_seconds: int = 300
) -> types.File:
    """Poll Gemini Files API until uploaded file becomes ACTIVE."""
    start = time.time()

    while True:
        current = client.files.get(name=file_name)
        state_obj = getattr(current, "state", None)
        state_value = (
            getattr(state_obj, "name", str(state_obj)) if state_obj is not None else ""
        )
        state_value = state_value.upper()

        if state_value == "ACTIVE":
            return current

        if state_value == "FAILED":
            raise RuntimeError("Gemini file processing failed.")

        if time.time() - start > timeout_seconds:
            raise TimeoutError("Timed out waiting for Gemini file to become ACTIVE.")

        time.sleep(2)


def ask_gemini_for_timestamp(
    client: genai.Client, uploaded_file: types.File, topic: str
) -> str:
    """Ask Gemini to return first spoken timestamp in HH:MM:SS format."""
    prompt = (
        "You are given an audio file from a YouTube video. "
        "Find the FIRST time the topic is spoken. "
        "Return only a JSON object with key 'timestamp' in HH:MM:SS format.\n\n"
        f"Topic: {topic}"
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[uploaded_file, prompt],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=TimestampOnly,
            temperature=0,
        ),
    )

    parsed = TimestampOnly.model_validate_json(response.text)

    if not re.fullmatch(r"\d{2}:\d{2}:\d{2}", parsed.timestamp):
        raise RuntimeError("Model did not return timestamp in HH:MM:SS format.")

    return parsed.timestamp


@app.post("/ask", response_model=AskResponse, status_code=status.HTTP_200_OK)
def ask(request: AskRequest) -> AskResponse:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not set.")

    client = genai.Client(api_key=api_key)
    local_audio_path = ""
    uploaded_file = None

    try:
        local_audio_path = download_audio_only(request.video_url)
        uploaded_file = client.files.upload(file=local_audio_path)
        active_file = wait_until_file_active(client, uploaded_file.name)
        timestamp = ask_gemini_for_timestamp(client, active_file, request.topic)

        return AskResponse(
            timestamp=timestamp,
            video_url=request.video_url,
            topic=request.topic,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        if local_audio_path and os.path.exists(local_audio_path):
            os.remove(local_audio_path)
            parent = str(Path(local_audio_path).parent)
            try:
                os.rmdir(parent)
            except OSError:
                pass

        if uploaded_file is not None:
            try:
                client.files.delete(name=uploaded_file.name)
            except Exception:
                pass


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8002)
