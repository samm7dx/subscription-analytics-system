-- =============================================================================
-- Subscription Analytic System — DBMS Project
-- indexes.sql — Secondary indexes for analytics query performance
-- Run after schema.sql, before or after sample_data.sql
-- =============================================================================

SET NAMES utf8mb4;

-- UserLogs: DAU (DATE(log_time)), active users (user_id + log_time)
CREATE INDEX idx_userlogs_log_time
  ON UserLogs (log_time);

CREATE INDEX idx_userlogs_user_log_time
  ON UserLogs (user_id, log_time);

-- WatchHistory: engagement, top content, genre analytics
CREATE INDEX idx_watchhistory_user_id
  ON WatchHistory (user_id);

CREATE INDEX idx_watchhistory_content_id
  ON WatchHistory (content_id);

CREATE INDEX idx_watchhistory_user_content
  ON WatchHistory (user_id, content_id);

CREATE INDEX idx_watchhistory_watch_time
  ON WatchHistory (watch_time);

-- Subscriptions: revenue, churn, monthly trends
CREATE INDEX idx_subscriptions_status
  ON Subscriptions (status);

CREATE INDEX idx_subscriptions_user_status
  ON Subscriptions (user_id, status);

CREATE INDEX idx_subscriptions_start_date
  ON Subscriptions (start_date);

CREATE INDEX idx_subscriptions_plan_id
  ON Subscriptions (plan_id);

-- Content: genre grouping
CREATE INDEX idx_content_genre
  ON Content (genre);

-- Users: signup / activity lookups
CREATE INDEX idx_users_last_active
  ON Users (last_active);

CREATE INDEX idx_users_signup_date
  ON Users (signup_date);
