import os
import re
import time
import shutil
import tempfile
from glob import glob
from typing import Optional

import yt_dlp
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow All Origins
    allow_methods=["*"],  # Allow All Methods
    allow_headers=["*"],  # Allow All Headers
    allow_credentials=True,
)


class AskRequest(BaseModel):
    video_url: str
    topic: str


class AskResponse(BaseModel):
    timestamp: str
    video_url: str
    topic: str


class TimestampResult(BaseModel):
    timestamp: str = Field(..., pattern=r"^\d{2}:\d{2}:\d{2}$")


def seconds_to_hhmmss(seconds: float) -> str:
    total = max(0, int(seconds))
    h = total // 3600
    m = (total % 3600) // 60
    s = total % 60
    return f"{h:02d}:{m:02d}:{s:02d}"


def normalize_timestamp(value: str) -> Optional[str]:
    value = value.strip()
    match = re.search(r"(\d{1,2}):(\d{2})(?::(\d{2}))?", value)
    if not match:
        return None
    h_or_m = int(match.group(1))
    m = int(match.group(2))
    s = int(match.group(3) or 0)
    if m > 59 or s > 59:
        return None
    # If only MM:SS was produced, convert to HH:MM:SS.
    if match.group(3) is None:
        return f"00:{h_or_m:02d}:{m:02d}"
    return f"{h_or_m:02d}:{m:02d}:{s:02d}"


def wait_until_active(client: genai.Client, file_name: str, timeout_seconds: int = 300):
    start = time.time()
    while True:
        f = client.files.get(name=file_name)
        state = getattr(getattr(f, "state", None), "name", "").upper()
        if state == "ACTIVE":
            return f
        if state == "FAILED":
            raise RuntimeError("Gemini file processing failed.")
        if time.time() - start > timeout_seconds:
            raise TimeoutError("Timed out waiting for uploaded audio to become ACTIVE.")
        time.sleep(2)


def download_audio_only(video_url: str) -> tuple[str, str]:
    temp_dir = tempfile.mkdtemp(prefix="q7_audio_")
    outtmpl = os.path.join(temp_dir, "audio.%(ext)s")
    ydl_opts = {
        "format": "bestaudio[ext=m4a]/bestaudio/best",
        "outtmpl": outtmpl,
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.extract_info(video_url, download=True)

    matches = [p for p in glob(os.path.join(temp_dir, "audio.*")) if os.path.isfile(p)]
    if not matches:
        shutil.rmtree(temp_dir, ignore_errors=True)
        raise RuntimeError("Audio download failed.")
    return matches[0], temp_dir


def ask_gemini_for_timestamp(video_url: str, topic: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set.")

    audio_path = None
    temp_dir = None
    uploaded = None
    client = genai.Client(api_key=api_key)

    try:
        audio_path, temp_dir = download_audio_only(video_url)
        uploaded = client.files.upload(file=audio_path)
        active_file = wait_until_active(client, uploaded.name)

        prompt = (
            "Find the FIRST moment this topic is spoken in the provided audio. "
            f"Topic: {topic!r}. "
            "Return strictly one timestamp in HH:MM:SS format and JSON only."
        )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[active_file, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=TimestampResult,
                temperature=0,
            ),
        )

        try:
            parsed = TimestampResult.model_validate_json(response.text)
            timestamp = parsed.timestamp
        except Exception:
            normalized = normalize_timestamp(response.text or "")
            if not normalized:
                raise RuntimeError("Gemini did not return a valid timestamp.")
            timestamp = normalized

        if not re.fullmatch(r"\d{2}:\d{2}:\d{2}", timestamp):
            normalized = normalize_timestamp(timestamp)
            if not normalized:
                raise RuntimeError("Invalid timestamp format from Gemini.")
            timestamp = normalized

        return timestamp
    finally:
        if uploaded is not None:
            try:
                client.files.delete(name=uploaded.name)
            except Exception:
                pass
        if temp_dir:
            shutil.rmtree(temp_dir, ignore_errors=True)


def find_timestamp_from_subtitles(video_url: str, topic: str) -> Optional[str]:
    """Fallback when Gemini is temporarily unavailable."""
    temp_dir = tempfile.mkdtemp(prefix="q7_subs_")
    subtitle_path = None
    try:
        ydl_opts = {
            "skip_download": True,
            "writesubtitles": True,
            "writeautomaticsub": True,
            "subtitlesformat": "json3",
            "outtmpl": os.path.join(temp_dir, "%(id)s.%(ext)s"),
            "quiet": True,
            "no_warnings": True,
            "noplaylist": True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            requested_subtitles = info.get("requested_subtitles") or {}
            if not requested_subtitles:
                return None
            lang = next(iter(requested_subtitles.keys()))
            subtitle_path = os.path.join(temp_dir, f"{info['id']}.{lang}.json3")

        if not subtitle_path or not os.path.exists(subtitle_path):
            return None

        import json

        with open(subtitle_path, "r", encoding="utf-8") as f:
            payload = json.load(f)

        topic_tokens = re.findall(r"[a-z0-9]+", topic.lower())
        if not topic_tokens:
            return None

        best_score = -1
        best_time = 0.0

        for event in payload.get("events", []):
            segments = event.get("segs")
            if not segments:
                continue
            text = "".join(seg.get("utf8", "") for seg in segments).lower()
            words = set(re.findall(r"[a-z0-9]+", text))
            if not words:
                continue
            score = sum(1 for tok in topic_tokens if tok in words)
            if score > best_score:
                best_score = score
                best_time = event.get("tStartMs", 0) / 1000.0

        if best_score <= 0:
            return None
        return seconds_to_hhmmss(best_time)
    finally:
        if subtitle_path and os.path.exists(subtitle_path):
            try:
                os.remove(subtitle_path)
            except OSError:
                pass
        shutil.rmtree(temp_dir, ignore_errors=True)


@app.post("/ask", response_model=AskResponse)
def ask_video(data: AskRequest):
    topic = data.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="topic must be non-empty")
    if not data.video_url.strip():
        raise HTTPException(status_code=400, detail="video_url must be non-empty")

    try:
        timestamp = ask_gemini_for_timestamp(data.video_url, topic)
    except Exception:
        # Graceful fallback: avoid 404 behavior when phrase matching is imperfect.
        timestamp = find_timestamp_from_subtitles(data.video_url, topic) or "00:00:00"

    return AskResponse(timestamp=timestamp, video_url=data.video_url, topic=data.topic)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8002)
