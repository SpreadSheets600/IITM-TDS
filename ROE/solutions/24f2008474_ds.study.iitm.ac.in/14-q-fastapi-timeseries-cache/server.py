#!/usr/bin/env python3
import csv
import json
from datetime import datetime
from functools import lru_cache
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

DATA_FILE = Path(__file__).with_name("q-fastapi-timeseries-cache.csv")


def load_rows():
    rows = []
    with DATA_FILE.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            rows.append(
                {
                    "timestamp": row["timestamp"],
                    "location": row["location"],
                    "sensor": row["sensor"],
                    "value": float(row["value"]),
                }
            )
    return rows


ROWS = load_rows()


@lru_cache(maxsize=512)
def compute_stats(location="", sensor="", start_date="", end_date=""):
    filtered = []
    for row in ROWS:
        ts = datetime.fromisoformat(row["timestamp"].replace("Z", "+00:00"))
        if location and row["location"] != location:
            continue
        if sensor and row["sensor"] != sensor:
            continue
        if start_date and ts < datetime.fromisoformat(start_date + "T00:00:00+00:00"):
            continue
        if end_date and ts > datetime.fromisoformat(end_date + "T00:00:00+00:00"):
            continue
        filtered.append(row["value"])

    if not filtered:
        return {"count": 0, "avg": 0, "min": 0, "max": 0}

    avg = round(sum(filtered) / len(filtered), 2)
    return {
        "count": len(filtered),
        "avg": avg,
        "min": round(min(filtered), 2),
        "max": round(max(filtered), 2),
    }


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != "/stats":
            self.send_response(404)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"not found"}')
            return

        params = parse_qs(parsed.query)
        location = params.get("location", [""])[0]
        sensor = params.get("sensor", [""])[0]
        start_date = params.get("start_date", [""])[0]
        end_date = params.get("end_date", [""])[0]

        before = compute_stats.cache_info().hits
        stats = compute_stats(location, sensor, start_date, end_date)
        after = compute_stats.cache_info().hits
        cache_state = "HIT" if after > before else "MISS"

        payload = json.dumps({"stats": stats}).encode("utf-8")
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("X-Cache", cache_state)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, format, *args):
        return


def self_test():
    result = compute_stats()
    assert "count" in result
    assert "avg" in result
    print("self-test ok")


if __name__ == "__main__":
    import sys

    if "--self-test" in sys.argv:
        self_test()
        raise SystemExit(0)

    port = 8000
    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"http://127.0.0.1:{port}/stats")
    server.serve_forever()
