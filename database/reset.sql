-- =============================================================================
-- Subscription Analytic System — DBMS Project
-- reset.sql — Drop all application tables (run before schema.sql)
-- Compatible with: MySQL 8+, Aiven, Railway, local MySQL
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS UserLogs;
DROP TABLE IF EXISTS WatchHistory;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Content;
DROP TABLE IF EXISTS Plans;
DROP TABLE IF EXISTS Users;

SET FOREIGN_KEY_CHECKS = 1;
