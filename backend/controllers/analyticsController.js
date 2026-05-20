const db = require("../config/db");

const executeAnalyticsQuery = (
  res,
  title,
  description,
  query,
  chartType,
  generatedFrom
) => {
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);

      const body = { error: "Database query failed" };
      if (process.env.NODE_ENV !== "production") {
        body.message = err.message;
      }
      return res.status(500).json(body);
    }

    res.json({
      title,
      description,
      query,
      chartType,
      generatedFrom,
      data: results,
    });
  });
};



// 1. DAILY ACTIVE USERS
const getDailyActiveUsers = (req, res) => {
  const query = `
    SELECT 
      DATE(log_time) AS activity_date,
      COUNT(DISTINCT user_id) AS total_active_users
    FROM UserLogs
    GROUP BY DATE(log_time)
    ORDER BY activity_date DESC
  `;

  executeAnalyticsQuery(
    res,
    "Daily Active Users",
    "Displays unique active users for each day based on logs.",
    query,
    "line",
    "Computed from UserLogs table records."
  );
};



// 2. TOTAL ACTIVE REVENUE
const getRevenueAnalytics = (req, res) => {
  const query = `
    SELECT 
      SUM(p.price) AS total_revenue_generated
    FROM Subscriptions s
    JOIN Plans p 
      ON s.plan_id = p.plan_id
    WHERE s.status = 'active'
  `;

  executeAnalyticsQuery(
    res,
    "Total Revenue",
    "Shows total revenue generated from active subscriptions.",
    query,
    "kpi",
    "Computed from active Subscriptions joined with Plans."
  );
};



// 3. TOP WATCHED CONTENT
const getTopContent = (req, res) => {
  const query = `
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
    LIMIT 10
  `;

  executeAnalyticsQuery(
    res,
    "Top Watched Content",
    "Displays most viewed content by watch count.",
    query,
    "bar",
    "Computed from WatchHistory and Content tables."
  );
};



// 4. USER CHURN ANALYSIS
const getUserChurn = (req, res) => {
  const query = `
    SELECT 
      status,
      COUNT(*) AS number_of_users
    FROM Subscriptions
    GROUP BY status
  `;

  executeAnalyticsQuery(
    res,
    "User Churn Analysis",
    "Displays active, expired, and cancelled subscriptions.",
    query,
    "pie",
    "Computed from Subscriptions grouped by status."
  );
};



// 5. USER ENGAGEMENT
const getUserEngagement = (req, res) => {
  const query = `
    SELECT 
      u.user_id,
      u.name,
      COUNT(w.watch_id) AS total_sessions,
      AVG(w.watch_duration) AS average_watch_time
    FROM Users u
    LEFT JOIN WatchHistory w 
      ON u.user_id = w.user_id
    GROUP BY u.user_id, u.name
    ORDER BY average_watch_time DESC
    LIMIT 20
  `;

  executeAnalyticsQuery(
    res,
    "User Engagement",
    "Shows average watch duration and sessions.",
    query,
    "bar",
    "Computed from Users and WatchHistory tables."
  );
};



// 6. MONTHLY REVENUE TREND
const getMonthlyRevenue = (req, res) => {
  const query = `
    SELECT 
      DATE_FORMAT(s.start_date, '%Y-%m') AS month,
      COUNT(s.subscription_id) AS total_subscriptions,
      SUM(p.price) AS monthly_revenue
    FROM Subscriptions s
    JOIN Plans p 
      ON s.plan_id = p.plan_id
    GROUP BY month
    ORDER BY month
  `;

  executeAnalyticsQuery(
    res,
    "Monthly Revenue Trend",
    "Displays monthly subscription revenue trends.",
    query,
    "area",
    "Computed from Subscriptions and Plans by start month."
  );
};



// 7. MOST ACTIVE USERS
const getMostActiveUsers = (req, res) => {
  const query = `
    SELECT 
      u.user_id,
      u.name,
      COUNT(l.log_id) AS activity_count
    FROM Users u
    JOIN UserLogs l 
      ON u.user_id = l.user_id
    GROUP BY u.user_id, u.name
    ORDER BY activity_count DESC
    LIMIT 10
  `;

  executeAnalyticsQuery(
    res,
    "Most Active Users",
    "Displays users with highest activity logs.",
    query,
    "leaderboard",
    "Computed from Users joined with UserLogs."
  );
};



// 8. GENRE ENGAGEMENT
const getGenreEngagement = (req, res) => {
  const query = `
    SELECT 
      c.genre,
      COUNT(w.watch_id) AS total_views,
      AVG(w.watch_duration) AS avg_watch_time
    FROM WatchHistory w
    JOIN Content c 
      ON w.content_id = c.content_id
    GROUP BY c.genre
    ORDER BY total_views DESC
  `;

  executeAnalyticsQuery(
    res,
    "Genre Engagement",
    "Displays engagement statistics by genre.",
    query,
    "doughnut",
    "Computed from WatchHistory joined with Content by genre."
  );
};



module.exports = {
  getDailyActiveUsers,
  getRevenueAnalytics,
  getTopContent,
  getUserChurn,
  getUserEngagement,
  getMonthlyRevenue,
  getMostActiveUsers,
  getGenreEngagement,
};