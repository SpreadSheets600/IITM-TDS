# Question 12

## Reconstructed Question
Parse large messy CSV-like transaction logs in shell/JS style and output category totals in a strict pipe-separated format.

## Reasoning
The script reproduces data and exact aggregation rules used by the quiz, including malformed-row behavior.

## Files
- `transactions_24f2008474@ds.study.iitm.ac.in.csv` - input.
- `solve_q12.js` - solver.

## How to run
```bash
node solve_q12.js 24f2008474@ds.study.iitm.ac.in
```
