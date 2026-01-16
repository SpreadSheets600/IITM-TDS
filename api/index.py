# api/index.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import statistics

app = FastAPI()

# Enable CORS for POST from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# ---- Sample telemetry loader ----
# Assumes telemetry bundle is included in repo as telemetry.json
# Format example:
# [
#   {"region":"emea","latency_ms":123,"uptime":1},
#   {"region":"amer","latency_ms":201,"uptime":0}
# ]

import json
from pathlib import Path

TELEMETRY = json.loads(Path("telemetry.json").read_text())

class RequestBody(BaseModel):
    regions: List[str]
    threshold_ms: int

@app.post("/api/latency")
def latency_metrics(body: RequestBody) -> Dict[str, dict]:
    result = {}

    for region in body.regions:
        records = [r for r in TELEMETRY if r["region"] == region]

        latencies = [r["latency_ms"] for r in records]
        uptimes = [r["uptime"] for r in records]

        if not latencies:
            continue

        avg_latency = statistics.mean(latencies)
        p95_latency = sorted(latencies)[int(0.95 * (len(latencies) - 1))]
        avg_uptime = statistics.mean(uptimes)
        breaches = sum(1 for l in latencies if l > body.threshold_ms)

        result[region] = {
            "avg_latency": avg_latency,
            "p95_latency": p95_latency,
            "avg_uptime": avg_uptime,
            "breaches": breaches,
        }

    return result
