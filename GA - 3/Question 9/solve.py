import json
from pathlib import Path

import fitz

PDF_PATH = Path(__file__).with_name("bounding_box_task.pdf")


def extract_bounding_boxes(pdf_path: Path):
    doc = fitz.open(pdf_path)
    page = doc[0]

    words = page.get_text("words")
    boxes = []
    for x0, y0, x1, y1, word, *_ in words:
        if word == "text":
            boxes.append(
                [
                    round(float(x0), 3),
                    round(float(y0), 3),
                    round(float(x1), 3),
                    round(float(y1), 3),
                ]
            )

    return boxes


if __name__ == "__main__":
    print(json.dumps(extract_bounding_boxes(PDF_PATH), indent=2))
