import os
import json
from enum import Enum
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Sentiment Analysis API",
    description="API for analyzing sentiment of comments using GPT-4.1-mini",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY"),
)


class SentimentType(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"


class SentimentResponse(BaseModel):
    sentiment: SentimentType = Field(
        ..., description="Overall sentiment of the comment"
    )
    rating: int = Field(
        ...,
        ge=1,
        le=5,
        description="Sentiment intensity (5=highly positive, 1=highly negative)",
    )


class CommentRequest(BaseModel):
    comment: str = Field(..., description="The comment to analyze")


@app.post("/comment", response_model=SentimentResponse, status_code=status.HTTP_200_OK)
async def analyze_comment(request: CommentRequest):
    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": "You are a sentiment analysis assistant. Analyze the following comment and return the sentiment and rating.",
                },
                {"role": "user", "content": request.comment},
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "sentiment_analysis",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "sentiment": {
                                "type": "string",
                                "enum": ["positive", "neutral", "negative"],
                                "description": "Overall sentiment of the comment",
                            },
                            "rating": {
                                "type": "integer",
                                "minimum": 1,
                                "maximum": 5,
                                "description": "Sentiment intensity (5=highly positive, 1=highly negative)",
                            },
                        },
                        "required": ["sentiment", "rating"],
                        "additionalProperties": False,
                    },
                    "strict": True,
                },
            },
        )

        response_content = completion.choices[0].message.content

        if not response_content:
            raise HTTPException(status_code=500, detail="Empty response from model")

        data = json.loads(response_content)
        return SentimentResponse(**data)

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing request: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
