# Question 3 - Code Interpreter API (FastAPI + NVIDIA LLM)

This solution implements a FastAPI service with `POST /code-interpreter` that:

1. Executes Python code and returns exact execution output.
2. Calls AI only when execution fails.
3. Uses structured JSON output (validated by Pydantic) to return error line numbers.
4. Keeps CORS fully open for testing.

## Architecture

Input:
```json
{"code": "...python code..."}
```

Flow:
1. `execute_python_code()` runs code using `exec()` and captures stdout/stderr.
2. If success:
   - Return `{"error": [], "result": "<exact output>"}`.
3. If failure:
   - Return exact traceback in `result`.
   - Send `code + traceback` to NVIDIA-hosted LLM using OpenAI Python SDK.
   - Parse structured response using Pydantic `ErrorAnalysis` model.
   - Return `{"error": [line_numbers], "result": "<exact traceback>"}`.

Reliability note:
- A deterministic traceback parser is included as fallback (`File "<string>", line N`) if the AI call fails.

## Files

- `main.py` - FastAPI app and endpoint implementation.
- `requirements.txt` - Python dependencies.

## Prerequisites

- Python 3.10+
- `uv` installed
- NVIDIA API key

## Environment Setup

From inside `Question 3`:

```bash
cd "Question 3"
```

Set your API key:

```bash
export NVIDIA_API_KEY="your_nvidia_api_key"
```

Optional `.env` file:

```env
NVIDIA_API_KEY=your_nvidia_api_key
```

## Install Dependencies (using uv)

```bash
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

## Run the API

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Server base URL:
- `http://127.0.0.1:8000`

Docs:
- `http://127.0.0.1:8000/docs`

## Endpoint

### `POST /code-interpreter`

Request body:

```json
{
  "code": "x = 10\ny = 0\nresult = x / y\nprint(result)"
}
```

Response body:

```json
{
  "error": [3],
  "result": "Traceback (most recent call last):\n ..."
}
```

## Test Cases

### 1. Success case

```bash
curl -X POST "http://127.0.0.1:8000/code-interpreter" \
  -H "Content-Type: application/json" \
  -d '{"code":"x = 5\ny = 10\nprint(x + y)"}'
```

Expected:
- `error` is `[]`
- `result` is exactly:
  ```
  15
  ```

### 2. Error case

```bash
curl -X POST "http://127.0.0.1:8000/code-interpreter" \
  -H "Content-Type: application/json" \
  -d '{"code":"x = 10\ny = 0\nresult = x / y"}'
```

Expected:
- `result` contains exact Python traceback.
- `error` contains line number `[3]`.

### 3. Another random snippet (for evaluation style testing)

```bash
curl -X POST "http://127.0.0.1:8000/code-interpreter" \
  -H "Content-Type: application/json" \
  -d '{"code":"nums = [1,2,3]\nprint(nums[10])"}'
```

Expected:
- traceback with `IndexError`
- `error` includes line `2`

## CORS

This app explicitly enables wildcard CORS:

```py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
```

## Important Note

`exec()` runs arbitrary Python code. This is acceptable for this assignment scenario, but in production you must isolate execution in a secure sandbox/container with strict resource and syscall limits.
