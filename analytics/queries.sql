-- OWNER- SURYA GAUTAM
-- =========================
-- PLANS
-- =========================
INSERT INTO Plans (plan_name, price, duration_days) VALUES
('Basic', 199, 30),
('Standard', 399, 30),
('Premium', 699, 30);

-- =========================
-- USERS (1000 USERS)
-- =========================
SET @row = 0;

INSERT INTO Users (name, email, signup_date, last_active)
SELECT 
    CONCAT('User', @row := @row + 1),
    CONCAT('user', @row, '@gmail.com'),
    NOW() - INTERVAL FLOOR(RAND()*365) DAY,
    NOW() - INTERVAL FLOOR(RAND()*10) DAY
FROM information_schema.tables
LIMIT 1000;

-- =========================
-- CONTENT (20 ITEMS)
-- =========================
INSERT INTO Content (title, genre, duration) VALUES
('Movie1','Action',120),('Movie2','Comedy',90),('Movie3','Sci-Fi',110),
('Movie4','Drama',95),('Movie5','Horror',100),
('Series1','Thriller',50),('Series2','Comedy',45),
('Series3','Drama',60),('Series4','Sci-Fi',55),
('Series5','Action',70),
('Doc1','Documentary',80),('Doc2','Documentary',75),
('Anime1','Animation',40),('Anime2','Animation',35),
('Show1','Reality',60),('Show2','Reality',50),
('Film1','Romance',120),('Film2','Romance',115),
('Film3','Action',130),('Film4','Thriller',125);

-- =========================
-- SUBSCRIPTIONS
-- =========================
INSERT INTO Subscriptions (user_id, plan_id, start_date, end_date, status)
SELECT 
    user_id,
    FLOOR(1 + RAND()*3),
    NOW() - INTERVAL FLOOR(RAND()*60) DAY,
    NOW() + INTERVAL FLOOR(RAND()*30) DAY,
    CASE 
        WHEN RAND() < 0.7 THEN 'active'
        WHEN RAND() < 0.9 THEN 'expired'
        ELSE 'cancelled'
    END
FROM Users;

-- =========================
-- WATCH HISTORY (5000 ROWS)
-- =========================
INSERT INTO WatchHistory (user_id, content_id, watch_time, watch_duration)
SELECT 
    FLOOR(1 + RAND()*1000),
    FLOOR(1 + RAND()*20),
    NOW() - INTERVAL FLOOR(RAND()*30) DAY,
    FLOOR(10 + RAND()*120)
FROM information_schema.tables t1,
     information_schema.tables t2
LIMIT 5000;

-- =========================
-- USER LOGS (5000 ROWS)
-- =========================
INSERT INTO UserLogs (user_id, action, log_time)
SELECT 
    FLOOR(1 + RAND()*1000),
    ELT(FLOOR(1 + RAND()*3), 'login', 'logout', 'watch'),
    NOW() - INTERVAL FLOOR(RAND()*30) DAY
FROM information_schema.tables t1,
     information_schema.tables t2
LIMIT 5000;
