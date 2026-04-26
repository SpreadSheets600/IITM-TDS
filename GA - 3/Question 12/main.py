from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
)

client = openai.OpenAI(
    api_key="eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjI0ZjIwMDY2NjFAZHMuc3R1ZHkuaWl0bS5hYy5pbiJ9.KQy4eine18YX3G45hL7Mi1WZY2Y6vyzTomC99DUILjk",  # ← put your real token here
    base_url="https://aipipe.org/openai/v1",
)


class QueryRequest(BaseModel):
    query: str


functions = [
    {
        "name": "get_ticket_status",
        "description": "Get the status of an IT support ticket",
        "parameters": {
            "type": "object",
            "properties": {"ticket_id": {"type": "integer"}},
            "required": ["ticket_id"],
        },
    },
    {
        "name": "schedule_meeting",
        "description": "Schedule a meeting",
        "parameters": {
            "type": "object",
            "properties": {
                "date": {"type": "string"},
                "time": {"type": "string"},
                "meeting_room": {"type": "string"},
            },
            "required": ["date", "time", "meeting_room"],
        },
    },
    {
        "name": "get_expense_balance",
        "description": "Get employee expense balance",
        "parameters": {
            "type": "object",
            "properties": {"employee_id": {"type": "integer"}},
            "required": ["employee_id"],
        },
    },
    {
        "name": "calculate_performance_bonus",
        "description": "Calculate performance bonus",
        "parameters": {
            "type": "object",
            "properties": {
                "employee_id": {"type": "integer"},
                "current_year": {"type": "integer"},
            },
            "required": ["employee_id", "current_year"],
        },
    },
    {
        "name": "report_office_issue",
        "description": "Report an office issue",
        "parameters": {
            "type": "object",
            "properties": {
                "issue_code": {"type": "integer"},
                "department": {"type": "string"},
            },
            "required": ["issue_code", "department"],
        },
    },
]


@app.get("/execute")
async def execute_query(q: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an internal routing assistant. Choose the correct function and extract parameters.",
            },
            {"role": "user", "content": q},
        ],
        functions=functions,
        function_call="auto",
    )

    message = response.choices[0].message

    if message.function_call:
        return {
            "name": message.function_call.name,
            "arguments": message.function_call.arguments,
        }

    return {"error": "No function matched"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8003)
