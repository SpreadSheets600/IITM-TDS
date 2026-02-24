import os
import re
import json
import traceback
from typing import List
from io import StringIO
from contextlib import redirect_stderr, redirect_stdout

from openai import OpenAI
from dotenv import load_dotenv
from fastapi import FastAPI, status
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Code Interpreter API",
    description="Execute Python code and use AI to identify error line numbers.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow All Origins
    allow_methods=["*"],  # Allow All Methods
    allow_headers=["*"],  # Allow All Headers
    allow_credentials=True,
)

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY"),
)


class CodeRequest(BaseModel):
    code: str = Field(..., description="Python code to execute")


class CodeExecutionResult(BaseModel):
    success: bool
    output: str


class ErrorAnalysis(BaseModel):
    error_lines: List[int] = Field(default_factory=list)


class CodeInterpreterResponse(BaseModel):
    error: List[int] = Field(default_factory=list)
    result: str


def execute_python_code(code: str) -> CodeExecutionResult:
    """Execute Python code and return exact stdout/stderr or traceback."""
    stdout_buffer = StringIO()
    stderr_buffer = StringIO()

    try:
        with redirect_stdout(stdout_buffer), redirect_stderr(stderr_buffer):
            exec(code, {})

        output = stdout_buffer.getvalue() + stderr_buffer.getvalue()
        return CodeExecutionResult(success=True, output=output)
    except Exception:
        return CodeExecutionResult(success=False, output=traceback.format_exc())


def extract_line_numbers_from_traceback(tb_text: str) -> List[int]:
    """Fallback extraction for entries like: File "<string>", line N"""
    matches = re.findall(r'File "<string>", line (\d+)', tb_text)
    unique_lines = sorted({int(line) for line in matches})
    return unique_lines


def analyze_error_with_ai(code: str, tb_text: str) -> List[int]:
    prompt = (
        "Analyze the Python code and traceback. "
        "Return ONLY the source code line number(s) where the error originated.\n\n"
        f"CODE:\n{code}\n\n"
        f"TRACEBACK:\n{tb_text}\n"
    )

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an error analysis assistant. "
                    "Return valid JSON with key error_lines as an array of integers."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "error_analysis",
                "schema": {
                    "type": "object",
                    "properties": {
                        "error_lines": {
                            "type": "array",
                            "items": {"type": "integer", "minimum": 1},
                        }
                    },
                    "required": ["error_lines"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        },
    )

    response_text = completion.choices[0].message.content
    if not response_text:
        return []

    data = json.loads(response_text)
    parsed = ErrorAnalysis(**data)
    return sorted({line for line in parsed.error_lines if line >= 1})


@app.post(
    "/code-interpreter",
    response_model=CodeInterpreterResponse,
    status_code=status.HTTP_200_OK,
)
async def code_interpreter(request: CodeRequest) -> CodeInterpreterResponse:
    execution_result = execute_python_code(request.code)

    if execution_result.success:
        return CodeInterpreterResponse(error=[], result=execution_result.output)

    fallback_lines = extract_line_numbers_from_traceback(execution_result.output)

    try:
        ai_lines = analyze_error_with_ai(request.code, execution_result.output)
        error_lines = ai_lines or fallback_lines
    except Exception:
        error_lines = fallback_lines

    return CodeInterpreterResponse(error=error_lines, result=execution_result.output)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
