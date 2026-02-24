# Question 7 - Smart Video Search API (`POST /ask`)

This solution builds a FastAPI endpoint that:

1. Accepts a YouTube URL and a topic.
2. Downloads **audio only** with `yt-dlp`.
3. Uploads the audio via **Gemini Files API**.
4. Polls until file state is `ACTIVE`.
5. Asks Gemini for the first timestamp where the topic is spoken.
6. Returns a strict `HH:MM:SS` timestamp with echoed input fields.
7. Cleans up local temporary audio after processing.

## Files

- `main.py` - FastAPI service implementation.
- `requirements.txt` - Required packages.

## Environment Variables

Create `.env` in `Question 7/`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

## Install and Run (with uv)

```bash
cd "Question 7"
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Local base URL:
- `http://127.0.0.1:8000`

Health check:
```bash
curl http://127.0.0.1:8000/health
```

## API Contract

### Request

`POST /ask`

```json
{
  "video_url": "https://youtu.be/dQw4w9WgXcQ",
  "topic": "never gonna give you up"
}
```

### Response

```json
{
  "timestamp": "00:00:43",
  "video_url": "https://youtu.be/dQw4w9WgXcQ",
  "topic": "never gonna give you up"
}
```

## cURL Test

```bash
curl -X POST "http://127.0.0.1:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "video_url": "https://youtu.be/dQw4w9WgXcQ",
    "topic": "never gonna give you up"
  }'
```

## Public URL for Validator

The validator needs a public base URL. Expose local port `8000` with one of these:

### Option 1: ngrok

```bash
ngrok http 8000
```

Use returned URL, e.g. `https://abc.ngrok.io`

### Option 2: cloudflared

```bash
cloudflared tunnel --url http://127.0.0.1:8000
```

Use returned URL, e.g. `https://xyz.trycloudflare.com`

Enter only the base URL in the portal (validator appends `/ask`).

## Notes

- Timestamp format is enforced with schema and regex: `HH:MM:SS`.
- The code uses Files API upload and waits for `ACTIVE` state before inference.
- Temporary audio files are removed in `finally` block.
- `yt-dlp` downloads audio only (`-x`, `--audio-format mp3`) to avoid video-frame issues.
