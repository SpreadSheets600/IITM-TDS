# Question 12 - Digital Assistant Function Dispatcher

This FastAPI app exposes:

- `GET /execute?q=...`

It deterministically maps templatized employee queries to one of these function signatures:

- `get_ticket_status(ticket_id: int)`
- `schedule_meeting(date: str, time: str, meeting_room: str)`
- `get_expense_balance(employee_id: int)`
- `calculate_performance_bonus(employee_id: int, current_year: int)`
- `report_office_issue(issue_code: int, department: str)`

## CORS

CORS is enabled for any origin for GET/OPTIONS.

## Run

```bash
cd "Question 12"
uv pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Endpoint to submit

`http://127.0.0.1:8000/execute`

(For public validator, submit your public base URL + `/execute`.)

## Response format

```json
{
  "name": "get_ticket_status",
  "arguments": "{\"ticket_id\":83742}"
}
```

`arguments` keys are emitted in the exact order required by each function signature.
