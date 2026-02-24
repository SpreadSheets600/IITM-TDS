import json
import re
from collections import OrderedDict

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TechNova Function Dispatcher",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

ARG_ORDER = {
    "get_ticket_status": ["ticket_id"],
    "schedule_meeting": ["date", "time", "meeting_room"],
    "get_expense_balance": ["employee_id"],
    "calculate_performance_bonus": ["employee_id", "current_year"],
    "report_office_issue": ["issue_code", "department"],
}


def ordered_payload(function_name: str, args: dict) -> dict:
    ordered_args = OrderedDict()
    for key in ARG_ORDER[function_name]:
        ordered_args[key] = args[key]
    return {
        "name": function_name,
        "arguments": json.dumps(ordered_args, separators=(",", ":")),
    }


def parse_query(q: str) -> dict | None:
    text = q.strip()

    m = re.search(r"status of ticket\s+(\d+)", text, flags=re.I)
    if m:
        return ordered_payload("get_ticket_status", {"ticket_id": int(m.group(1))})

    m = re.search(
        r"schedule a meeting on\s+(\d{4}-\d{2}-\d{2})\s+at\s+(\d{2}:\d{2})\s+in\s+(.+?)[\.\s]*$",
        text,
        flags=re.I,
    )
    if m:
        return ordered_payload(
            "schedule_meeting",
            {
                "date": m.group(1),
                "time": m.group(2),
                "meeting_room": m.group(3).strip(),
            },
        )

    m = re.search(r"expense balance for employee\s+(\d+)", text, flags=re.I)
    if m:
        return ordered_payload(
            "get_expense_balance", {"employee_id": int(m.group(1))}
        )

    m = re.search(
        r"performance bonus for employee\s+(\d+)\s+for\s+(\d{4})",
        text,
        flags=re.I,
    )
    if m:
        return ordered_payload(
            "calculate_performance_bonus",
            {"employee_id": int(m.group(1)), "current_year": int(m.group(2))},
        )

    m = re.search(
        r"report office issue\s+(\d+)\s+for\s+(?:the\s+)?(.+?)\s+department[\.\s]*$",
        text,
        flags=re.I,
    )
    if m:
        return ordered_payload(
            "report_office_issue",
            {"issue_code": int(m.group(1)), "department": m.group(2).strip()},
        )

    m = re.search(
        r"report office issue\s+(\d+)\s+for\s+(.+?)[\.\s]*$", text, flags=re.I
    )
    if m:
        return ordered_payload(
            "report_office_issue",
            {"issue_code": int(m.group(1)), "department": m.group(2).strip()},
        )

    return None


@app.get("/execute")
async def execute(q: str = Query(...)):
    parsed = parse_query(q)
    if parsed is None:
        raise HTTPException(status_code=400, detail="Unsupported query format")
    return parsed


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
