from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Load the pretrained Hugging Face sentiment model once when the app starts.
# This model returns labels like POSITIVE and NEGATIVE.
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
