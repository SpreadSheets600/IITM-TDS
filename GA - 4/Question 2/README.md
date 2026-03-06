# Question 2: Excel – Z-Score Outlier Surveillance

## Question ID

`q-excel-zscore-outlier`

## Question Summary

PulseCare operates a network of clinics. Patient satisfaction scores are surveyed weekly. You need to flag clinics that are statistical outliers (|z-score| ≥ 2.5).

**Task:** Download the CSV, compute z-scores using AVERAGE + STDEV.S (sample stdev), and count how many clinics have |z-score| ≥ 2.5.

## Key Details

- **Seed:** `{your_email}#q-excel-zscore-outlier`
- **Data:** 90–110 clinic scores (depends on seed)
- **Formula:** z-score = `(score - AVERAGE) / STDEV.S`
- **Threshold:** |z-score| ≥ 2.5
- **Tolerance:** ±1 (so your count can be off by 1)

## Answer Algorithm

Run the solver:

```bash
node solve.js your_email@example.com
```

## How the Solver Works

1. Generates p = 90 + floor(rng() × 20) store scores using Box-Muller normal distribution
2. Injects l = 6 + floor(rng() × 3) outliers (±12-18 added to random stores)
3. Clamps all values to [40, 100]
4. Computes sample mean and sample stdev
5. Counts stores where |z-score| ≥ 2.5

## Steps to Solve Manually in Excel

1. Import the CSV into Excel
2. In column C, compute z-score: `=STANDARDIZE(B2, AVERAGE($B$2:$B$101), STDEV.S($B$2:$B$101))`
3. In column D, check threshold: `=ABS(C2)>=2.5`
4. Count with: `=COUNTIF(D2:D101, TRUE)`

## Files

- `solve.js` — Node.js solver
