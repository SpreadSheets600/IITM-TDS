{{ config(
    materialized='table',
    schema='marts',
    tags=['operations','support','weekly'],
    meta={'freshness_sla':'daily'}
) }}

with support_tickets as (
    select
        ticket_id,
        agent_id,
        queue,
        sla_target_minutes,
        handled_minutes,
        resolved_on_first_contact,
        created_at::date as ticket_date
    from {{ ref('stg_support_tickets') }}
    where created_at::date >= current_date - interval '30 days'
),

weekly_support as (
    select
        date_trunc('week', ticket_date) as week_start,
        count(distinct ticket_id) as ticket_volume,
        coalesce(avg(handled_minutes), 0) as avg_handle_minutes,
        coalesce(sum(case when handled_minutes > sla_target_minutes then 1 else 0 end), 0) as sla_breaches,
        coalesce(
            sum(case when resolved_on_first_contact then 1 else 0 end) * 1.0
            / nullif(count(distinct ticket_id), 0),
            0
        ) as first_contact_resolution
    from support_tickets
    group by 1
)

select
    week_start,
    ticket_volume,
    avg_handle_minutes,
    sla_breaches,
    first_contact_resolution,
    coalesce(avg_handle_minutes, 0) as avg_handle_minutes_filled
from weekly_support
order by week_start;
