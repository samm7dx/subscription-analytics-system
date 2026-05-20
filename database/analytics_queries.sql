-- =============================================================================
-- Subscription Analytic System — DBMS Project
-- analytics_queries.sql — Core API analytics + optional advanced queries
--
-- Core queries (1–8) match Express API endpoints and chart outputs.
-- Optional queries (9–14) are for reports and DBMS documentation.
-- =============================================================================

SET NAMES utf8mb4;

-- =============================================================================
-- CORE ANALYTICS (used by backend API)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Daily Active Users (DAU) — GET /api/analytics/dau
-- Unique users per day from UserLogs
-- -----------------------------------------------------------------------------
SELECT
  DATE(ul.log_time) AS activity_date,
  COUNT(DISTINCT ul.user_id) AS total_active_users
FROM UserLogs AS ul
GROUP BY DATE(ul.log_time)
ORDER BY activity_date DESC;


-- -----------------------------------------------------------------------------
-- 2. Total Revenue — GET /api/analytics/revenue
-- Sum of plan prices for active subscriptions
-- -----------------------------------------------------------------------------
SELECT
  SUM(p.price) AS total_revenue_generated
FROM Subscriptions AS s
INNER JOIN Plans AS p ON s.plan_id = p.plan_id
WHERE s.status = 'active';


-- -----------------------------------------------------------------------------
-- 3. Top Watched Content — GET /api/analytics/top-content
-- -----------------------------------------------------------------------------
SELECT
  c.content_id,
  c.title,
  c.genre,
  COUNT(w.watch_id) AS total_views
FROM WatchHistory AS w
INNER JOIN Content AS c ON w.content_id = c.content_id
GROUP BY c.content_id, c.title, c.genre
ORDER BY total_views DESC, c.title ASC
LIMIT 10;


-- -----------------------------------------------------------------------------
-- 4. User Churn Analysis — GET /api/analytics/churn
-- Subscription counts by status
-- -----------------------------------------------------------------------------
SELECT
  s.status,
  COUNT(*) AS number_of_users
FROM Subscriptions AS s
GROUP BY s.status
ORDER BY number_of_users DESC;


-- -----------------------------------------------------------------------------
-- 5. User Engagement — GET /api/analytics/engagement
-- -----------------------------------------------------------------------------
SELECT
  u.user_id,
  u.name,
  COUNT(w.watch_id) AS total_sessions,
  AVG(w.watch_duration) AS average_watch_time
FROM Users AS u
LEFT JOIN WatchHistory AS w ON u.user_id = w.user_id
GROUP BY u.user_id, u.name
ORDER BY average_watch_time DESC, total_sessions DESC
LIMIT 20;


-- -----------------------------------------------------------------------------
-- 6. Monthly Revenue Trend — GET /api/analytics/monthly-revenue
-- -----------------------------------------------------------------------------
SELECT
  DATE_FORMAT(s.start_date, '%Y-%m') AS month,
  COUNT(s.subscription_id) AS total_subscriptions,
  SUM(p.price) AS monthly_revenue
FROM Subscriptions AS s
INNER JOIN Plans AS p ON s.plan_id = p.plan_id
GROUP BY DATE_FORMAT(s.start_date, '%Y-%m')
ORDER BY month ASC;


-- -----------------------------------------------------------------------------
-- 7. Most Active Users — GET /api/analytics/active-users
-- -----------------------------------------------------------------------------
SELECT
  u.user_id,
  u.name,
  COUNT(l.log_id) AS activity_count
FROM Users AS u
INNER JOIN UserLogs AS l ON u.user_id = l.user_id
GROUP BY u.user_id, u.name
ORDER BY activity_count DESC, u.name ASC
LIMIT 10;


-- -----------------------------------------------------------------------------
-- 8. Genre Engagement — GET /api/analytics/genre-engagement
-- -----------------------------------------------------------------------------
SELECT
  c.genre,
  COUNT(w.watch_id) AS total_views,
  AVG(w.watch_duration) AS avg_watch_time
FROM WatchHistory AS w
INNER JOIN Content AS c ON w.content_id = c.content_id
GROUP BY c.genre
ORDER BY total_views DESC, c.genre ASC;


-- =============================================================================
-- OPTIONAL ADVANCED ANALYTICS (documentation / reports)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 9. Plan distribution — subscriptions per plan
-- -----------------------------------------------------------------------------
SELECT
  p.plan_id,
  p.plan_name,
  p.price,
  COUNT(s.subscription_id) AS subscription_count,
  SUM(CASE WHEN s.status = 'active' THEN 1 ELSE 0 END) AS active_count
FROM Plans AS p
LEFT JOIN Subscriptions AS s ON p.plan_id = s.plan_id
GROUP BY p.plan_id, p.plan_name, p.price
ORDER BY subscription_count DESC;


-- -----------------------------------------------------------------------------
-- 10. Average subscription duration (days) by status
-- -----------------------------------------------------------------------------
SELECT
  s.status,
  COUNT(*) AS subscription_count,
  ROUND(AVG(DATEDIFF(s.end_date, s.start_date)), 2) AS avg_duration_days
FROM Subscriptions AS s
WHERE s.end_date IS NOT NULL
GROUP BY s.status
ORDER BY subscription_count DESC;


-- -----------------------------------------------------------------------------
-- 11. Top engagement day — highest DAU date
-- -----------------------------------------------------------------------------
SELECT
  DATE(ul.log_time) AS activity_date,
  COUNT(DISTINCT ul.user_id) AS total_active_users
FROM UserLogs AS ul
GROUP BY DATE(ul.log_time)
ORDER BY total_active_users DESC
LIMIT 1;


-- -----------------------------------------------------------------------------
-- 12. Average revenue per user (active subscriptions)
-- -----------------------------------------------------------------------------
SELECT
  ROUND(
    SUM(p.price) / NULLIF(COUNT(DISTINCT s.user_id), 0),
    2
  ) AS avg_revenue_per_user
FROM Subscriptions AS s
INNER JOIN Plans AS p ON s.plan_id = p.plan_id
WHERE s.status = 'active';


-- -----------------------------------------------------------------------------
-- 13. Content completion insights — avg watch vs catalog duration
-- -----------------------------------------------------------------------------
SELECT
  c.content_id,
  c.title,
  c.genre,
  c.duration AS catalog_duration_min,
  ROUND(AVG(w.watch_duration), 2) AS avg_watch_duration_min,
  ROUND(AVG(w.watch_duration) / NULLIF(c.duration, 0) * 100, 2) AS avg_completion_pct
FROM Content AS c
INNER JOIN WatchHistory AS w ON c.content_id = w.content_id
GROUP BY c.content_id, c.title, c.genre, c.duration
ORDER BY avg_completion_pct DESC
LIMIT 15;


-- -----------------------------------------------------------------------------
-- 14. Most popular genres — ranked by views and unique viewers
-- -----------------------------------------------------------------------------
SELECT
  c.genre,
  COUNT(w.watch_id) AS total_views,
  COUNT(DISTINCT w.user_id) AS unique_viewers,
  ROUND(AVG(w.watch_duration), 2) AS avg_watch_minutes
FROM WatchHistory AS w
INNER JOIN Content AS c ON w.content_id = c.content_id
GROUP BY c.genre
ORDER BY total_views DESC, unique_viewers DESC
LIMIT 10;
