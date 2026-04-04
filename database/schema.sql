-- OWNER- SATWIK RAJ

-- =========================
-- DROP TABLES (FOR RESET)
-- =========================
DROP TABLE IF EXISTS UserLogs;
DROP TABLE IF EXISTS WatchHistory;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Content;
DROP TABLE IF EXISTS Plans;
DROP TABLE IF EXISTS Users;

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  signup_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME
);

-- =========================
-- PLANS TABLE
-- =========================
CREATE TABLE Plans (
  plan_id INT AUTO_INCREMENT PRIMARY KEY,
  plan_name VARCHAR(50),
  price DECIMAL(10,2),
  duration_days INT
);

-- =========================
-- SUBSCRIPTIONS TABLE
-- =========================
CREATE TABLE Subscriptions (
  subscription_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_id INT,
  start_date DATETIME,
  end_date DATETIME,
  status ENUM('active','expired','cancelled'),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (plan_id) REFERENCES Plans(plan_id)
);

-- =========================
-- CONTENT TABLE
-- =========================
CREATE TABLE Content (
  content_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  genre VARCHAR(50),
  duration INT
);

-- =========================
-- WATCH HISTORY TABLE
-- =========================
CREATE TABLE WatchHistory (
  watch_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  content_id INT,
  watch_time DATETIME,
  watch_duration INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (content_id) REFERENCES Content(content_id)
);

-- =========================
-- USER LOGS TABLE
-- =========================
CREATE TABLE UserLogs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100),
  log_time DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
