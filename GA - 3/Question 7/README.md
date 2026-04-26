# Question 7 - YouTube Topic Timestamp Finder (`POST /ask`)

This implementation uses **Gemini API** as primary inference.

## Flow

1. Accept `video_url` and `topic`.
2. Download **audio only** using `yt-dlp`.
3. Upload audio via Gemini Files API (`client.files.upload`).
4. Poll uploaded file until `ACTIVE`.
5. Ask Gemini for first mention timestamp using structured output schema.
6. Return strict `HH:MM:SS` + echo fields.
7. Cleanup temporary files and uploaded Gemini file.

## Fallback

If Gemini call fails (quota/transient), it falls back to subtitle-based timestamp extraction instead of crashing.

## Env

```env
GEMINI_API_KEY=your_key
```

## Run

```bash
cd "Question 7"
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Test

```bash
curl -X POST "http://127.0.0.1:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{"video_url":"https://youtu.be/kCc8FmEb1nY","topic":"all of the uh noes talk to each other uh fully so as an example if you are doing"}'
```
