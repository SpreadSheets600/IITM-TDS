# Question 7

## Reconstructed Question
Flatten nested customer/order/item JSON and compute total quantity for a target region/category/channel within a date window.

## Reasoning
The deterministic solver reconstructs nested data and applies exact filters to produce the required quantity.

## Files
- `q-json-customer-flatten.jsonl` - generated nested data.

## How to run
Use the master solver:
```bash
node ../solve_all.js 24f2008474@ds.study.iitm.ac.in
```
