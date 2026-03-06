# Question 6

## Reconstructed Question
From JSON sensor telemetry, compute rollup metric(s) for a filtered site/device/date window while excluding maintenance/offline records.

## Reasoning
The solver mirrors the same seeded generation and filtering logic, then computes the required aggregate (average temperature).

## Files
- `q-json-sensor-rollup.jsonl` - generated telemetry.

## How to run
Use the master solver:
```bash
node ../solve_all.js 24f2008474@ds.study.iitm.ac.in
```
