# Question 5

## Reconstructed Question
Given noisy supplier-spend data (OpenRefine-style cleaning task), compute total **Approved** spend (USD) for one target supplier and category.

## Reasoning
The script reproduces the quiz's deterministic data generation and computes the cleaned aggregate for the target pair.

## Files
- `q-openrefine-supplier-spend.csv` - generated input for this email.
- `solve.js` - deterministic solver.

## How to run
```bash
node solve.js 24f2008474@ds.study.iitm.ac.in
```
