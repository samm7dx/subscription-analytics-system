-- =============================================================================
-- Subscription Analytic System — DBMS Project
-- sample_data.sql — Cloud-compatible randomized seed data (MySQL 8+)
--
-- Does NOT use information_schema — works on Aiven, Railway, and local MySQL.
-- Uses recursive CTEs for exact row counts.
--
-- Targets: Users=1000, Subscriptions=1000, Content=20,
--          WatchHistory=5000, UserLogs=5000
-- =============================================================================

SET NAMES utf8mb4;
SET SESSION cte_max_recursion_depth = 10000;

-- -----------------------------------------------------------------------------
-- Plans (fixed catalog)
-- -----------------------------------------------------------------------------
INSERT INTO Plans (plan_name, price, duration_days) VALUES
  ('Basic', 199.00, 30),
  ('Standard', 399.00, 30),
  ('Premium', 699.00, 30);

-- -----------------------------------------------------------------------------
-- Users — 1000 rows via recursive sequence (cloud-safe)
-- -----------------------------------------------------------------------------
INSERT INTO Users (name, email, signup_date, last_active)
WITH RECURSIVE user_seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM user_seq WHERE n < 1000
)
SELECT
  CONCAT('User', n) AS name,
  CONCAT('user', n, '@gmail.com') AS email,
  DATE_SUB(NOW(), INTERVAL MOD(n * 17, 365) DAY) AS signup_date,
  DATE_SUB(NOW(), INTERVAL MOD(n * 3, 10) DAY) AS last_active
FROM user_seq;

-- -----------------------------------------------------------------------------
-- Content — 20 catalog items
-- -----------------------------------------------------------------------------
INSERT INTO Content (title, genre, duration) VALUES
  ('Movie1', 'Action', 120),
  ('Movie2', 'Comedy', 90),
  ('Movie3', 'Sci-Fi', 110),
  ('Movie4', 'Drama', 95),
  ('Movie5', 'Horror', 100),
  ('Series1', 'Thriller', 50),
  ('Series2', 'Comedy', 45),
  ('Series3', 'Drama', 60),
  ('Series4', 'Sci-Fi', 55),
  ('Series5', 'Action', 70),
  ('Doc1', 'Documentary', 80),
  ('Doc2', 'Documentary', 75),
  ('Anime1', 'Animation', 40),
  ('Anime2', 'Animation', 35),
  ('Show1', 'Reality', 60),
  ('Show2', 'Reality', 50),
  ('Film1', 'Romance', 120),
  ('Film2', 'Romance', 115),
  ('Film3', 'Action', 130),
  ('Film4', 'Thriller', 125);

-- -----------------------------------------------------------------------------
-- Subscriptions — one per user (1000 rows), valid FKs only
-- -----------------------------------------------------------------------------
INSERT INTO Subscriptions (user_id, plan_id, start_date, end_date, status)
SELECT
  u.user_id,
  1 + MOD(u.user_id * 7, 3) AS plan_id,
  DATE_SUB(NOW(), INTERVAL MOD(u.user_id * 11, 60) DAY) AS start_date,
  DATE_ADD(
    DATE_SUB(NOW(), INTERVAL MOD(u.user_id * 11, 60) DAY),
    INTERVAL 30 DAY
  ) AS end_date,
  CASE
    WHEN MOD(u.user_id, 10) < 7 THEN 'active'
    WHEN MOD(u.user_id, 10) < 9 THEN 'expired'
    ELSE 'cancelled'
  END AS status
FROM Users u;

-- -----------------------------------------------------------------------------
-- WatchHistory — 5000 rows; user_id in [1,1000], content_id in [1,20]
-- -----------------------------------------------------------------------------
INSERT INTO WatchHistory (user_id, content_id, watch_time, watch_duration)
WITH RECURSIVE watch_seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM watch_seq WHERE n < 5000
)
SELECT
  1 + MOD(n * 13, 1000) AS user_id,
  1 + MOD(n * 7, 20) AS content_id,
  DATE_SUB(NOW(), INTERVAL MOD(n * 5, 30) DAY) - INTERVAL MOD(n, 86400) SECOND AS watch_time,
  10 + MOD(n * 19, 120) AS watch_duration
FROM watch_seq;

-- -----------------------------------------------------------------------------
-- UserLogs — 5000 rows; user_id in [1,1000]
-- -----------------------------------------------------------------------------
INSERT INTO UserLogs (user_id, action, log_time)
WITH RECURSIVE log_seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM log_seq WHERE n < 5000
)
SELECT
  1 + MOD(n * 23, 1000) AS user_id,
  ELT(1 + MOD(n, 3), 'login', 'logout', 'watch') AS action,
  DATE_SUB(NOW(), INTERVAL MOD(n * 4, 30) DAY) - INTERVAL MOD(n * 37, 86400) SECOND AS log_time
FROM log_seq;

-- -----------------------------------------------------------------------------
-- Optional: verify row counts after import
-- -----------------------------------------------------------------------------
-- SELECT 'Users' AS tbl, COUNT(*) AS cnt FROM Users
-- UNION ALL SELECT 'Plans', COUNT(*) FROM Plans
-- UNION ALL SELECT 'Content', COUNT(*) FROM Content
-- UNION ALL SELECT 'Subscriptions', COUNT(*) FROM Subscriptions
-- UNION ALL SELECT 'WatchHistory', COUNT(*) FROM WatchHistory
-- UNION ALL SELECT 'UserLogs', COUNT(*) FROM UserLogs;
