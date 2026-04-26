"""
Q20: Audio Transcript Extraction from YouTube

Steps:
1. Find the YouTube URL from the exam page (one of several tutorial videos)
2. Extract a 30-second clip using yt-dlp + ffmpeg
3. Transcribe with whisper or the Gemini API
4. Submit the transcript text

Install dependencies:
  pip install yt-dlp openai-whisper
  sudo apt install ffmpeg

Usage: python solve_q20.py <youtube_url> <start_seconds> <end_seconds>
Example: python solve_q20.py "https://youtu.be/XXX" 60 90
"""

import sys
import os
import subprocess
import tempfile


def transcript_clip(url, start_s, end_s):
    duration = end_s - start_s

    with tempfile.TemporaryDirectory() as tmpdir:
        # Download audio only
        audio_path = os.path.join(tmpdir, "audio.%(ext)s")
        subprocess.run(
            [
                "yt-dlp",
                "-f",
                "bestaudio",
                "-x",
                "--audio-format",
                "mp3",
                "-o",
                audio_path,
                url,
            ],
            check=True,
        )

        # Find downloaded file
        audio_files = [f for f in os.listdir(tmpdir) if f.startswith("audio")]
        if not audio_files:
            raise RuntimeError("Audio download failed")
        downloaded = os.path.join(tmpdir, audio_files[0])

        # Trim clip
        clip_path = os.path.join(tmpdir, "clip.mp3")
        subprocess.run(
            [
                "ffmpeg",
                "-i",
                downloaded,
                "-ss",
                str(start_s),
                "-t",
                str(duration),
                "-c",
                "copy",
                clip_path,
            ],
            check=True,
        )

        # Transcribe with whisper
        import whisper

        model = whisper.load_model("base")
        result = model.transcribe(clip_path, language="en")
        return result["text"].strip()


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python solve_q20.py <youtube_url> <start_sec> <end_sec>")
        sys.exit(1)

    url = sys.argv[1]
    start = int(sys.argv[2])
    end = int(sys.argv[3])

    print("Transcribing...")
    text = transcript_clip(url, start, end)
    print("\nTranscript:")
    print(text)
