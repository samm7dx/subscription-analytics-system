export const analyticsMetrics = {
  dau: {
    id: "dau",
    title: "Daily Active Users (DAU)",
    description: "Unique users active per day",
    why: "Shows engagement trend over time.",
    unit: "users",
    recommendedChart: "line",
    sql: `
      SELECT DATE(log_time) AS date,
             COUNT(DISTINCT user_id) AS users
      FROM UserLogs
      GROUP BY date
      ORDER BY date;
    `,
  },
  total_active_revenue: {
    id: "total_active_revenue",
    title: "Total Active Revenue",
    description: "Sum of plan price for active subscriptions",
    why: "Quick snapshot of current monetization from active users.",
    unit: "currency",
    recommendedChart: "kpi",
    sql: `
      SELECT SUM(p.price) AS total_revenue_generated
      FROM Subscriptions s
      JOIN Plans p ON s.plan_id = p.plan_id
      WHERE s.status = 'active';
    `,
  },
  monthly_revenue: {
    id: "monthly_revenue",
    title: "Monthly Revenue Trend",
    description: "Revenue summed per month from subscriptions",
    why: "Highlights growth/seasonality in subscription revenue.",
    unit: "currency",
    recommendedChart: "line",
    sql: `
      SELECT DATE_FORMAT(s.start_date, '%Y-%m') AS month,
             COUNT(s.subscription_id) AS total_subscriptions,
             SUM(p.price) AS monthly_revenue
      FROM Subscriptions s
      JOIN Plans p ON s.plan_id = p.plan_id
      GROUP BY month
      ORDER BY month;
    `,
  },
  top_content: {
    id: "top_content",
    title: "Top Content",
    description: "Most watched titles (top 10)",
    why: "Shows what drives consumption and retention.",
    unit: "views",
    recommendedChart: "bar",
    sql: `
      SELECT c.title,
             c.genre,
             COUNT(w.watch_id) AS total_views
      FROM WatchHistory w
      JOIN Content c ON w.content_id = c.content_id
      GROUP BY c.content_id, c.title, c.genre
      ORDER BY total_views DESC
      LIMIT 10;
    `,
  },
  churn_status: {
    id: "churn_status",
    title: "Subscription Status Breakdown",
    description: "Count of subscriptions by status",
    why: "Simple churn proxy: cancelled/expired vs active.",
    unit: "subscriptions",
    recommendedChart: "doughnut",
    sql: `
      SELECT status,
             COUNT(*) AS number_of_users
      FROM Subscriptions
      GROUP BY status;
    `,
  },
  engagement_by_user: {
    id: "engagement_by_user",
    title: "User Engagement (Avg Watch Time)",
    description: "Average watch duration per user",
    why: "Identifies power users and content fit.",
    unit: "minutes",
    recommendedChart: "bar",
    sql: `
      SELECT u.user_id,
             u.name,
             COUNT(w.watch_id) AS total_sessions,
             AVG(w.watch_duration) AS average_watch_time
      FROM Users u
      LEFT JOIN WatchHistory w ON u.user_id = w.user_id
      GROUP BY u.user_id, u.name
      ORDER BY average_watch_time DESC
      LIMIT 20;
    `,
  },
  most_active_users: {
    id: "most_active_users",
    title: "Most Active Users (by logs)",
    description: "Users with the most activity logs",
    why: "Shows highly engaged users and activity volume.",
    unit: "events",
    recommendedChart: "bar",
    sql: `
      SELECT u.user_id,
             u.name,
             COUNT(l.log_id) AS activity_count
      FROM Users u
      JOIN UserLogs l ON u.user_id = l.user_id
      GROUP BY u.user_id, u.name
      ORDER BY activity_count DESC
      LIMIT 10;
    `,
  },
  genre_engagement: {
    id: "genre_engagement",
    title: "Content Engagement by Genre",
    description: "Views and avg watch duration by genre",
    why: "Reveals what genres people consume most and how long they watch.",
    unit: "views",
    recommendedChart: "bar",
    sql: `
      SELECT c.genre,
             COUNT(w.watch_id) AS total_views,
             AVG(w.watch_duration) AS avg_watch_time
      FROM WatchHistory w
      JOIN Content c ON w.content_id = c.content_id
      GROUP BY c.genre
      ORDER BY total_views DESC;
    `,
  },
};

export function listMetrics() {
  return Object.values(analyticsMetrics).map(({ sql, ...meta }) => meta);
}

export function getMetric(metricId) {
  return analyticsMetrics[metricId] ?? null;
}
