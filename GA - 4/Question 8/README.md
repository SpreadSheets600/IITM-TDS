# Question 8

## Reconstructed Question
Parse partially corrupted JSONL records and compute total valid sales.

## Reasoning
Both Node and Python implementations salvage valid JSON rows and aggregate the target numeric field.

## Files
- `q-parse-partial-json.jsonl` - input data.
- `solve_q8.mjs` - Node solution.
- `solve_q8.py` - Python solution.

## How to run
```bash
node solve_q8.mjs 24f2008474@ds.study.iitm.ac.in
```
