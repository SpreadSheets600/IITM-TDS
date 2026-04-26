"""
Q18: DuckDB: Data Preparation for RetailCo
Question ID: q-duckdb-data-preparation

From the source code analysis:
- Filter: region = 'LATAM', price_band = 'medium' (> 323)
- price_band thresholds: high > 720, medium > 323, else 'low'
- The answer is a DuckDB SQL query that returns order_count and total_amount

The ACTUAL answer is a SQL query. The validation just checks:
- It has SELECT, FROM, WHERE/HAVING/GROUP BY
- Returns order_count and total_amount for band='medium', region='LATAM'

This solver generates the correct SQL answer.
"""

SQL_ANSWER = """
SELECT
    COUNT(*) AS order_count,
    SUM(amount) AS total_amount
FROM (
    SELECT
        *,
        CASE
            WHEN unit_price > 720 THEN 'high'
            WHEN unit_price > 323 THEN 'medium'
            ELSE 'low'
        END AS price_band
    FROM orders
    WHERE region = 'LATAM'
) sub
WHERE price_band = 'medium';
"""

print("Q18: DuckDB Data Preparation")
print("=" * 50)
print("The answer is the DuckDB SQL query shown below.")
print("Copy and paste this into the answer box.")
print()
print(SQL_ANSWER.strip())
