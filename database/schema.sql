-- =============================================================================
-- Subscription Analytic System — DBMS Project
-- schema.sql — Table definitions (no seed data, no indexes)
--
-- Run order: reset.sql → schema.sql → indexes.sql → sample_data.sql
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- Users — account records
-- -----------------------------------------------------------------------------
CREATE TABLE Users (
  user_id INT AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  signup_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User accounts for the subscription analytic database';

-- -----------------------------------------------------------------------------
-- Plans — subscription plan catalog
-- -----------------------------------------------------------------------------
CREATE TABLE Plans (
  plan_id INT AUTO_INCREMENT,
  plan_name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INT NOT NULL,
  PRIMARY KEY (plan_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Subscription plan definitions';

-- -----------------------------------------------------------------------------
-- Subscriptions — user plan assignments
-- -----------------------------------------------------------------------------
CREATE TABLE Subscriptions (
  subscription_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NULL DEFAULT NULL,
  status ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
  PRIMARY KEY (subscription_id),
  CONSTRAINT fk_subscriptions_user
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_subscriptions_plan
    FOREIGN KEY (plan_id) REFERENCES Plans (plan_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Subscription records linked to users and plans';

-- -----------------------------------------------------------------------------
-- Content — catalog items
-- -----------------------------------------------------------------------------
CREATE TABLE Content (
  content_id INT AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  duration INT NOT NULL COMMENT 'Duration in minutes',
  PRIMARY KEY (content_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Content catalog for watch history analytics';

-- -----------------------------------------------------------------------------
-- WatchHistory — viewing sessions
-- -----------------------------------------------------------------------------
CREATE TABLE WatchHistory (
  watch_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  content_id INT NOT NULL,
  watch_time DATETIME NOT NULL,
  watch_duration INT NOT NULL COMMENT 'Watched minutes',
  PRIMARY KEY (watch_id),
  CONSTRAINT fk_watchhistory_user
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_watchhistory_content
    FOREIGN KEY (content_id) REFERENCES Content (content_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Per-user content viewing events';

-- -----------------------------------------------------------------------------
-- UserLogs — activity log entries (DAU and activity analytics)
-- -----------------------------------------------------------------------------
CREATE TABLE UserLogs (
  log_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  log_time DATETIME NOT NULL,
  PRIMARY KEY (log_id),
  CONSTRAINT fk_userlogs_user
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User activity logs for engagement and DAU metrics';

SET FOREIGN_KEY_CHECKS = 1;
