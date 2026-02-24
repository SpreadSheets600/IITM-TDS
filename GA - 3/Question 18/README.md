# Question 18 - Clean Up Excel Sales Data

This solution cleans the provided workbook:

- `q-clean-up-excel-sales-data.xlsx`

It reads the `RawData` sheet, normalizes messy fields, validates parseability, and produces cleaned outputs plus summary metrics.

## Files

- `main.py` - End-to-end parser + cleaner + summarizer (no external dependencies).
- `q-clean-up-excel-sales-data.xlsx` - Input workbook.

## Cleaning rules

1. `Customer Name`
- Trim leading/trailing spaces.
- Collapse repeated spaces to a single space.

2. `Country`
- Normalize common aliases/codes:
  - `US`, `USA`, `United States` -> `USA`
  - `UK` -> `United Kingdom`
  - `UAE` -> `United Arab Emirates`
  - `BRA` -> `Brazil`
  - `IND` -> `India`

3. `Date`
- Parse mixed formats and convert to `YYYY-MM-DD`.
- Supported formats include:
  - `YYYY-MM-DD`
  - `YYYY/MM/DD`
  - `MM-DD-YYYY`
  - `MM/DD/YYYY`
  - `DD-MM-YYYY`
  - `DD/MM/YYYY`

4. `Product/Code`
- Split into:
  - `product`
  - `code`

5. `Sales` and `Cost`
- Extract numeric values from strings like `"  6062 USD"`.
- Convert to `float`.

6. `Profit`
- Compute `sales - cost` when both are available.

## Run

```bash
cd "Question 18"
python3 main.py q-clean-up-excel-sales-data.xlsx
```

## Output files

- `cleaned_sales_data.csv`
- `summary.json`

The command also prints summary JSON to stdout.

## Note

If your assignment asks for a specific final metric (for example, filtered totals, top-N, or a single number), share the exact question text and the script can be adjusted immediately to compute that exact answer.
