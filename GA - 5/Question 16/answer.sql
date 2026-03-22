WITH typed AS (
  SELECT
    TRY_CAST("timestamp" AS TIMESTAMP) AS ts,
    category,
    amount
  FROM sales
),
hourly AS (
  SELECT
    EXTRACT(HOUR FROM ts) AS hour,
    category,
    SUM(amount) AS total_amount
  FROM typed
  WHERE ts IS NOT NULL
  GROUP BY 1, 2
)
SELECT
  hour,
  ROUND(COALESCE(SUM(total_amount) FILTER (WHERE category = 'Electronics'), 0)) AS Electronics,
  ROUND(COALESCE(SUM(total_amount) FILTER (WHERE category = 'Clothing'), 0)) AS Clothing,
  ROUND(COALESCE(SUM(total_amount) FILTER (WHERE category = 'Home Goods'), 0)) AS "Home Goods"
FROM hourly
GROUP BY 1
ORDER BY 1;
