# Question 10

## Reconstructed Question
Extract ZIP codes from noisy addresses (AI-formula style) and return a comma-separated list, using `N/A` when unavailable.

## Reasoning
The solver normalizes unstructured lines and extracts a 5-digit ZIP only when valid.

## Files
- `addresses_24f2008474@ds.study.iitm.ac.in.csv` - input data.
- `solve_q10.js` - parser and formatter.

## How to run
```bash
node solve_q10.js 24f2008474@ds.study.iitm.ac.in
```
