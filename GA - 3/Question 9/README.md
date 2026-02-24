# Question 9 - Bounding Box Task

This solution uses **PyMuPDF (`fitz`)** to extract word-level bounding boxes from `bounding_box_task.pdf`.

## Files

- `bounding_box_task.pdf` - Input PDF.
- `solve.py` - Extraction script using `fitz`.

## Approach

1. Open PDF with `fitz.open(...)`.
2. Read first-page words via `page.get_text("words")`.
3. Filter entries where word is `text`.
4. Return strict validator format: `[[x0, y0, x1, y1], ...]`.

## Run

```bash
cd "Question 9"
python3 -m pip install PyMuPDF
python3 solve.py
```

## Output

`solve.py` prints a JSON array of numeric boxes only:

- `[[x0, y0, x1, y1], ...]`

This matches the validator requirement for PyMuPDF-based coordinates.
