# Question 4 — ELI15 Step-by-step Solution

## What are we building?

We are building a small internet API.

You send it a sentence like:

```json
{"text": "I absolutely loved this movie, it was fantastic!"}
```

It sends back whether the sentence sounds positive or negative:

```json
{"label": "POSITIVE", "score": 0.9998}
```

The assignment specifically wants:

- A Hugging Face Spaces hosted URL
- A `POST /predict` endpoint
- JSON input: `{"text": "..."}`
- JSON output: `{"label": "...", "score": 0.99}`

---

## Files you need

Your Space needs these 4 files:

```text
app.py
requirements.txt
Dockerfile
README.md
```

---

## Step 1: Create `app.py`

This is the main API code.

```python
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Load the pretrained Hugging Face sentiment model once when the app starts.
classifier = pipeline("sentiment-analysis")


class TextRequest(BaseModel):
    text: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict(request: TextRequest):
    result = classifier(request.text)[0]
    return {"label": result["label"], "score": float(result["score"])}
```

### What this does

- `FastAPI()` creates the API app.
- `pipeline("sentiment-analysis")` downloads and uses a ready-made sentiment model.
- `TextRequest` says the request body must contain a text field.
- `POST /predict` receives the text and returns the model prediction.

---

## Step 2: Create `requirements.txt`

This tells Hugging Face which Python packages to install.

```text
fastapi
uvicorn
transformers
torch
```

### What these packages do

- `fastapi`: creates the API
- `uvicorn`: runs the API server
- `transformers`: loads the Hugging Face model
- `torch`: needed by the model

---

## Step 3: Create `Dockerfile`

This tells Hugging Face how to run the app.

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 7860

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
```

Important: Hugging Face Spaces expects apps to run on port `7860`.

---

## Step 4: Create `README.md`

The top of `README.md` must say `sdk: docker`.

```markdown
---
title: TDS GA 8 Q 4 Sentiment API
emoji: 😊
colorFrom: purple
colorTo: pink
sdk: docker
pinned: false
---

# Sentiment Analysis API

This Space serves a FastAPI sentiment analysis API.
```

The important line is:

```yaml
sdk: docker
```

Without this, Hugging Face may create the wrong type of Space.

---

## Step 5: Create a new Hugging Face Space

Go to:

```text
https://huggingface.co/new-space
```

Choose:

- Owner: your username
- Space name: for example `TDS-GA-8-Q-4`
- License: any/default is okay
- SDK: Docker
- Visibility: Public

Then create the Space.

If your username is `SpreadSheets600` and your Space is `TDS-GA-8-Q-4`, your final URL will probably be:

```text
https://spreadsheets600-tds-ga-8-q-4.hf.space
```

---

## Step 6: Upload the files

Upload these files to the new Space:

```text
app.py
requirements.txt
Dockerfile
README.md
```

Hugging Face will start building the Space. Wait a few minutes.

---

## Step 7: Test the API

### Test health

Open this in your browser:

```text
https://YOUR-SPACE-URL.hf.space/health
```

Expected response:

```json
{"status":"ok"}
```

### Test prediction with curl

Run:

```bash
curl -X POST "https://YOUR-SPACE-URL.hf.space/predict" \
  -H "Content-Type: application/json" \
  -d '{"text":"I absolutely loved this movie, it was fantastic!"}'
```

Expected response should be similar to:

```json
{"label":"POSITIVE","score":0.9998}
```

Test negative sentence:

```bash
curl -X POST "https://YOUR-SPACE-URL.hf.space/predict" \
  -H "Content-Type: application/json" \
  -d '{"text":"This is the worst experience I have ever had."}'
```

Expected response should be similar to:

```json
{"label":"NEGATIVE","score":0.9997}
```

---

## Step 8: Submit the URL

Submit only the base Hugging Face Spaces URL, for example:

```text
https://spreadsheets600-tds-ga-8-q-4.hf.space
```

Do not submit localhost. Do not submit ngrok. The assignment only accepts Hugging Face, Vercel, or Render-style hosted URLs.
