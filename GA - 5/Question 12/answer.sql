WITH parsed AS (
  SELECT
    CASE
      WHEN regexp_matches(sale_date, '^[0-9]{4}-[0-9]{2}-[0-9]{2}$')
        THEN STRPTIME(sale_date, '%Y-%m-%d')
      WHEN regexp_matches(sale_date, '^[0-9]{2}/[0-9]{2}/[0-9]{4}$')
        THEN STRPTIME(sale_date, '%d/%m/%Y')
      ELSE STRPTIME(sale_date, '%B %d, %Y')
    END AS dt,
    amount
  FROM sales
),
monthly AS (
  SELECT
    STRFTIME(dt, '%Y-%m') AS month,
    SUM(amount) AS revenue
  FROM parsed
  WHERE dt IS NOT NULL
  GROUP BY 1
),
growth AS (
  SELECT
    month,
    ROUND(
      (revenue - LAG(revenue) OVER (ORDER BY month))
      / LAG(revenue) OVER (ORDER BY month) * 100,
      2
    ) AS mom_growth_pct
  FROM monthly
)
SELECT month, mom_growth_pct
FROM growth
WHERE mom_growth_pct IS NOT NULL
ORDER BY mom_growth_pct DESC
LIMIT 1;
