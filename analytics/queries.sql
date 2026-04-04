-- OWNER- SURYA GAUTAM

-- ============================================
-- 1. DAILY ACTIVE USERS (DAU)
-- ============================================
SELECT 
    DATE(log_time) AS activity_date,
    COUNT(DISTINCT user_id) AS total_active_users
FROM UserLogs
GROUP BY DATE(log_time)
ORDER BY activity_date DESC;


-- ============================================
-- 2. TOTAL ACTIVE REVENUE
-- ============================================
SELECT 
    SUM(p.price) AS total_revenue_generated
FROM Subscriptions s
JOIN Plans p 
    ON s.plan_id = p.plan_id
WHERE s.status = 'active';


-- ============================================
-- 3. TOP 10 MOST WATCHED CONTENT
-- ============================================
SELECT 
    c.content_id,
    c.title,
    c.genre,
    COUNT(w.watch_id) AS total_views
FROM WatchHistory w
JOIN Content c 
    ON w.content_id = c.content_id
GROUP BY c.content_id, c.title, c.genre
ORDER BY total_views DESC
LIMIT 10;


-- ============================================
-- 4. USER CHURN ANALYSIS
-- ============================================
SELECT 
    status,
    COUNT(*) AS number_of_users
FROM Subscriptions
GROUP BY status;


-- ============================================
-- 5. USER ENGAGEMENT (AVG WATCH TIME)
-- ============================================
SELECT 
    u.user_id,
    u.name,
    COUNT(w.watch_id) AS total_sessions,
    AVG(w.watch_duration) AS average_watch_time
FROM Users u
LEFT JOIN WatchHistory w 
    ON u.user_id = w.user_id
GROUP BY u.user_id, u.name
ORDER BY average_watch_time DESC;


-- ============================================
-- 6. MONTHLY REVENUE TREND
-- ============================================
SELECT 
    DATE_FORMAT(s.start_date, '%Y-%m') AS month,
    COUNT(s.subscription_id) AS total_subscriptions,
    SUM(p.price) AS monthly_revenue
FROM Subscriptions s
JOIN Plans p 
    ON s.plan_id = p.plan_id
GROUP BY month
ORDER BY month;


-- ============================================
-- 7. MOST ACTIVE USERS (BY LOGS)
-- ============================================
SELECT 
    u.user_id,
    u.name,
    COUNT(l.log_id) AS activity_count
FROM Users u
JOIN UserLogs l 
    ON u.user_id = l.user_id
GROUP BY u.user_id, u.name
ORDER BY activity_count DESC
LIMIT 10;


-- ============================================
-- 8. CONTENT ENGAGEMENT BY GENRE
-- ============================================
SELECT 
    c.genre,
    COUNT(w.watch_id) AS total_views,
    AVG(w.watch_duration) AS avg_watch_time
FROM WatchHistory w
JOIN Content c 
    ON w.content_id = c.content_id
GROUP BY c.genre
ORDER BY total_views DESC;


-- ============================================
-- 9. INDEXING FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_user_logs 
ON UserLogs(user_id, log_time);

CREATE INDEX idx_watch_history 
ON WatchHistory(user_id, content_id);

CREATE INDEX idx_subscriptions 
ON Subscriptions(user_id, status);
