export const analyticsKnowledge = [
  {
    key: "dau",
    title: "Daily Active Users (DAU)",
    chartType: "Line Chart",
    definition:
      "DAU counts unique users with at least one log entry per calendar day in the UserLogs table.",
    whyItMatters:
      "Used to study daily usage patterns, compare activity across dates, and evaluate changes in user participation over time.",
    sqlExplanation:
      "COUNT(DISTINCT user_id) grouped by DATE(log_time), ordered by activity date.",
    schema: [
      {
        table: "UserLogs",
        attributes: ["log_id", "user_id", "log_time"],
      },
    ],
    exampleInsight:
      "Increasing DAU over consecutive days suggests higher daily participation; a downward trend may indicate reduced activity.",
  },
  {
    key: "revenue",
    title: "Total Revenue",
    chartType: "KPI",
    definition:
      "Total Revenue is the sum of plan prices for all subscriptions with status equal to active.",
    whyItMatters:
      "Provides a single-value summary of current subscription revenue stored in the database.",
    sqlExplanation:
      "SUM(p.price) with JOIN between Subscriptions and Plans, filtered by s.status = 'active'.",
    schema: [
      {
        table: "Subscriptions",
        attributes: ["subscription_id", "user_id", "plan_id", "status", "start_date"],
      },
      {
        table: "Plans",
        attributes: ["plan_id", "plan_name", "price"],
      },
    ],
    exampleInsight:
      "A higher total revenue value indicates greater combined value from active subscription records.",
  },
  {
    key: "topContent",
    title: "Top Watched Content",
    chartType: "Bar Chart",
    definition:
      "Ranks content items by the number of watch history records associated with each title.",
    whyItMatters:
      "Shows which content records receive the most views based on stored watch events.",
    sqlExplanation:
      "COUNT(watch_id) per content_id with JOIN to Content; grouped by title and genre; LIMIT 10.",
    schema: [
      {
        table: "WatchHistory",
        attributes: ["watch_id", "user_id", "content_id", "watch_duration"],
      },
      {
        table: "Content",
        attributes: ["content_id", "title", "genre"],
      },
    ],
    exampleInsight:
      "Content with the highest view count appears most frequently in the WatchHistory table.",
  },
  {
    key: "churn",
    title: "User Churn Analysis",
    chartType: "Pie Chart",
    definition:
      "Displays the count of subscriptions grouped by status: active, expired, or cancelled.",
    whyItMatters:
      "Helps compare how many subscriptions remain active versus those that have ended or been cancelled.",
    sqlExplanation:
      "COUNT(*) FROM Subscriptions GROUP BY status.",
    schema: [
      {
        table: "Subscriptions",
        attributes: ["subscription_id", "user_id", "plan_id", "status", "start_date", "end_date"],
      },
    ],
    exampleInsight:
      "A larger cancelled or expired segment relative to active status indicates more non-active subscriptions in the dataset.",
  },
  {
    key: "engagement",
    title: "User Engagement",
    chartType: "Bar Chart",
    definition:
      "Reports per-user session count and average watch duration from the WatchHistory table.",
    whyItMatters:
      "Supports comparison of viewing behavior across users using stored session and duration fields.",
    sqlExplanation:
      "LEFT JOIN Users and WatchHistory; COUNT(watch_id) and AVG(watch_duration); limited to top 20 users by average duration.",
    schema: [
      {
        table: "Users",
        attributes: ["user_id", "name", "email"],
      },
      {
        table: "WatchHistory",
        attributes: ["watch_id", "user_id", "content_id", "watch_duration"],
      },
    ],
    exampleInsight:
      "Users with higher average watch duration spent more time per session in the recorded data.",
  },
  {
    key: "monthlyRevenue",
    title: "Monthly Revenue Trend",
    chartType: "Area Chart",
    definition:
      "Shows monthly subscription count and total revenue grouped by subscription start month.",
    whyItMatters:
      "Useful for observing how revenue and new subscriptions change across months in the dataset.",
    sqlExplanation:
      "DATE_FORMAT(start_date, '%Y-%m'), COUNT(subscription_id), SUM(plan price), grouped by month.",
    schema: [
      {
        table: "Subscriptions",
        attributes: ["subscription_id", "plan_id", "start_date", "status"],
      },
      {
        table: "Plans",
        attributes: ["plan_id", "price"],
      },
    ],
    exampleInsight:
      "Months with higher monthly_revenue values correspond to greater summed plan prices for subscriptions started in that period.",
  },
  {
    key: "activeUsers",
    title: "Most Active Users",
    chartType: "Leaderboard",
    definition:
      "Lists users ranked by the number of rows in UserLogs, representing logged activity events.",
    whyItMatters:
      "Identifies users with the highest recorded log frequency in the database sample.",
    sqlExplanation:
      "JOIN Users and UserLogs; COUNT(log_id) as activity_count; ORDER BY activity_count DESC; LIMIT 10.",
    schema: [
      {
        table: "Users",
        attributes: ["user_id", "name"],
      },
      {
        table: "UserLogs",
        attributes: ["log_id", "user_id", "log_time"],
      },
    ],
    exampleInsight:
      "The top-ranked user has the highest count of log entries among all users in the result set.",
  },
  {
    key: "genreEngagement",
    title: "Genre Engagement",
    chartType: "Doughnut Chart",
    definition:
      "Aggregates watch history by content genre, reporting total views and average watch duration per genre.",
    whyItMatters:
      "Shows how viewing activity is distributed across genre values in the Content table.",
    sqlExplanation:
      "JOIN WatchHistory and Content; GROUP BY genre; COUNT(watch_id) and AVG(watch_duration).",
    schema: [
      {
        table: "WatchHistory",
        attributes: ["watch_id", "content_id", "watch_duration"],
      },
      {
        table: "Content",
        attributes: ["content_id", "genre", "title"],
      },
    ],
    exampleInsight:
      "Genres with higher total_views have more associated watch records in the database.",
  },
];
