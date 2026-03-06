"""
Q11: FastAPI Batch Sentiment Analysis Server
Question ID: q-fastapi-sentiment-batch

Deploy this server and submit its URL.
The server must:
  - Accept POST /sentiment  (NOT POST /)
  - Body: {"sentences": ["text1", "text2", ...]}
  - Response: {"results": [{"sentence": "text1", "sentiment": "happy"}, ...]}
  - Valid sentiments: "happy", "sad", "neutral"
  - Must pass at least 7 out of 10 randomly selected test cases

Run: uvicorn server:app --host 0.0.0.0 --port 8000
Then submit: http://localhost:8000  (or your public URL)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI(title="Sentiment Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SentimentRequest(BaseModel):
    sentences: list[str]

class SentimentResult(BaseModel):
    sentence: str
    sentiment: str

class SentimentResponse(BaseModel):
    results: list[SentimentResult]

# Simple keyword-based sentiment classifier
HAPPY_WORDS = {
    "love","wonderful","amazing","fantastic","excited","thrilled","joy","great",
    "happy","delighted","excellent","best","proud","ecstatic","overjoyed","blessed",
    "grinning","jumping","smile","laughing","perfect","dream","bliss","elated",
    "spectacular","fortunate","celebrate","radiating","cheerful","winning","beautiful",
    "hoping","gratitude","engagement","promotion","vacation","accomplished","spectacular",
    "exceeded","couldn't stop smiling","best day","life is","pure joy","cloud nine",
    "bursting","energized","overjoyed","thrilled","thankful","grateful","adore"
}

SAD_WORDS = {
    "terrible","worst","horrible","lost","sad","heartbroken","devastated","miserable",
    "crying","broken","failed","lonely","abandoned","suffering","pain","grief","sorrow",
    "hopeless","disappointed","regret","betrayal","bad","depressed","drowning","defeated",
    "crushed","consumed","shattered","overwhelmed","haunted","burdened","anxiety",
    "trauma","exhausted","empty","struggling","worried sick","sick","diagnosis",
    "pet passed","layoffs","rejected","nobody showed","burned down","fell apart"
}

def classify(text: str) -> str:
    text_lower = text.lower()
    
    happy_score = sum(1 for w in HAPPY_WORDS if w in text_lower)
    sad_score = sum(1 for w in SAD_WORDS if w in text_lower)
    
    # Negation handling
    if re.search(r"feel (great|fantastic|wonderful|amazing|alive)", text_lower):
        happy_score += 2
    if re.search(r"feel (terrible|horrible|sad|hopeless|defeated|empty|lonely)", text_lower):
        sad_score += 2
    if re.search(r"(can't stop smiling|jumping for joy|on cloud nine|bliss|dream come true)", text_lower):
        happy_score += 3
    if re.search(r"(heart is broken|drowning in|crushed by|haunted by|overwhelmed with)", text_lower):
        sad_score += 3
    
    if happy_score > sad_score:
        return "happy"
    elif sad_score > happy_score:
        return "sad"
    else:
        return "neutral"

@app.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    results = []
    for sentence in request.sentences:
        sentiment = classify(sentence)
        results.append(SentimentResult(sentence=sentence, sentiment=sentiment))
    return SentimentResponse(results=results)

@app.get("/")
async def root():
    return {"message": "Sentiment Analysis API", "endpoint": "POST /sentiment"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
