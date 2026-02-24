import requests

base_url = "http://127.0.0.1:8001/execute"

test_queries = [
    "What is the status of ticket 83742?",
    "Schedule a meeting on 2025-02-15 at 14:00 in Room A.",
    "Show my expense balance for employee 10056.",
    "Calculate performance bonus for employee 10056 for 2025.",
    "Report office issue 45321 for the Facilities department.",
]

for q in test_queries:
    print(f"Query: {q}")
    response = requests.get(base_url, params={"q": q})
    print(f"Response: {response.json()}")
    print("-" * 20)
