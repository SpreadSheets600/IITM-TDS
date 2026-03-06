# Question 15

## Reconstructed Question
Recursively salvage corrupted JSON logs, sum a target metric field, and submit the SHA-256 hash of the integer total.

## Reasoning
The script reads the corrupted dataset, recovers valid rows, computes the sum, then hashes the decimal integer string.

## Files
- `corrupted_logs.zip` - input logs.
- `solve_q15.py` - parser and hash generator.

## How to run
```bash
python solve_q15.py 24f2008474@ds.study.iitm.ac.in
```
