# Question 11

## Reconstructed Question
Implement and expose a FastAPI endpoint for batch sentiment classification with the exact response contract required by the quiz checker.

## Reasoning
The provided server implements the expected schema and deterministic sentiment logic for checker validation.

## Files
- `server.py` - FastAPI app.

## How to run
```bash
uvicorn server:app --host 0.0.0.0 --port 8000
```
Expose via a tunnel (ngrok/localtunnel) and submit the public URL.
