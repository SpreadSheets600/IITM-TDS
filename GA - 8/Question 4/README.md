---
title: TDS GA 8 Q 4 Sentiment API
emoji: 😊
colorFrom: purple
colorTo: pink
sdk: docker
pinned: false
---

# Sentiment Analysis API

This Hugging Face Space serves a FastAPI REST API for sentiment analysis.

## Endpoints

- `GET /health`
- `POST /predict`

## Example request

```bash
curl -X POST "https://YOUR-USERNAME-YOUR-SPACE.hf.space/predict" \
  -H "Content-Type: application/json" \
  -d '{"text":"I absolutely loved this movie, it was fantastic!"}'
```

## Example response

```json
{"label":"POSITIVE","score":0.9998}
```
