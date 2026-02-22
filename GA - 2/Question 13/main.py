import os
import csv
from typing import List, Optional
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

students = []
csv_path = os.path.join(os.path.dirname(__file__), "q-fastapi.csv")

try:
    with open(csv_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Strip whitespace just in case
            students.append(
                {
                    "studentId": int(row["studentId"].strip()),
                    "class": row["class"].strip(),
                }
            )
except FileNotFoundError:
    print(f"Error: {csv_path} not found.")


@app.get("/api")
def get_students(class_: Optional[List[str]] = Query(None, alias="class")):
    if not class_:
        return {"students": students}

    filtered_students = [s for s in students if s["class"] in class_]

    return {"students": filtered_students}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
