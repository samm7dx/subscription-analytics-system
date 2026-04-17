import { query } from "../db.js";

export const runQuery = async (req, res) => {
  try {
    const { type } = req.params;

    let sql = "";

    if (type === "dau") {
      sql = `
        SELECT DATE(log_time) AS date,
        COUNT(DISTINCT user_id) AS users
        FROM UserLogs
        GROUP BY date
        ORDER BY date;
      `;
    }

    else if (type === "revenue") {
      sql = `
        SELECT DATE_FORMAT(start_date, '%Y-%m') AS month,
        SUM(p.price) AS revenue
        FROM Subscriptions s
        JOIN Plans p ON s.plan_id = p.plan_id
        GROUP BY month
        ORDER BY month;
      `;
    }

    else if (type === "top") {
      sql = `
        SELECT c.title, COUNT(*) AS views
        FROM WatchHistory w
        JOIN Content c ON w.content_id = c.content_id
        GROUP BY c.title
        ORDER BY views DESC
        LIMIT 10;
      `;
    }

    const data = await query(sql);
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
