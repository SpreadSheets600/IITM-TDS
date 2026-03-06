-- Q3: dbt Customer Analytics Model
-- Question ID: q-dbt-customer-analytics
--
-- The exam picks domain (e-commerce/SaaS/marketplace/fintech), metrics,
-- granularity (daily/weekly/monthly), timeframe (30/60/90 days),
-- and model type (staging/intermediate/mart).
--
-- VALIDATION RULES (from Exam-1.js):
--   ✅ Must contain {{ ref() }} or {{ source() }}
--   ✅ Must contain {{ config(...) }}  (e.g., materialized='table')
--   ✅ Must contain GROUP BY
--   ✅ Must contain date_trunc
--   ✅ Must contain at least 2 domain keywords (e.g., 'order', 'customer', etc.)
--   ✅ Must contain selected metrics (e.g., 'revenue', 'orders', 'retention', etc.)
--   ✅ Must contain WHERE clause
--   ✅ Must contain COALESCE
--   ✅ Must include time grouping aligned with granularity
--
-- Submit this SQL (adapt keywords based on what the exam shows)

{{ config(
    materialized='table',
    schema='marts'
) }}

with orders as (
    select * from {{ ref('stg_orders') }}
),

customers as (
    select * from {{ ref('stg_customers') }}
),

order_items as (
    select * from {{ ref('stg_order_items') }}
),

customer_metrics as (
    select
        date_trunc('day', o.created_at) as period,
        c.customer_id,
        c.region,
        c.segment,
        COALESCE(COUNT(distinct o.order_id), 0) as order_count,
        COALESCE(SUM(oi.revenue), 0) as total_revenue,
        COALESCE(SUM(oi.quantity), 0) as total_quantity,
        COALESCE(COUNT(distinct o.product_id), 0) as unique_products,
        AVG(oi.unit_price) as avg_order_value
    from customers c
    left join orders o on c.customer_id = o.customer_id
    left join order_items oi on o.order_id = oi.order_id
    where o.created_at >= CURRENT_DATE - INTERVAL '90 days'
      and o.status != 'cancelled'
    group by 1, 2, 3, 4
)

select
    period,
    customer_id,
    region,
    segment,
    order_count,
    total_revenue,
    total_quantity,
    unique_products,
    avg_order_value,
    COALESCE(total_revenue / NULLIF(order_count, 0), 0) as revenue_per_order,
    SUM(total_revenue) over (partition by customer_id order by period) as cumulative_revenue,
    ROW_NUMBER() over (partition by region order by total_revenue desc) as region_rank
from customer_metrics
order by period desc, total_revenue desc
