# Question 18

## Reconstructed Question
Write a DuckDB SQL query that filters by region and price band, then returns order count and total amount.

## Reasoning
This is a SQL-authoring task. The solved query uses correct predicates for the required medium price band and LATAM region.

## Files
- `solve.py` - helper with solved SQL.

## Answer SQL
```sql
SELECT
    COUNT(*) AS order_count,
    SUM(unit_price) AS total_amount
FROM orders
WHERE region = 'LATAM'
  AND unit_price > 323
  AND unit_price <= 720;
```
