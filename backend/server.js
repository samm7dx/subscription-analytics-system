import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { query } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  res.json({ ok: true, message: "API running" });
});

app.get("/api/kpis", async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        (SELECT COUNT(*) FROM Users) AS total_users,
        (SELECT COUNT(*) FROM Content) AS total_content,
        (SELECT COUNT(*) FROM Subscriptions WHERE status = 'active') AS active_subscriptions,
        (SELECT COALESCE(SUM(p.price), 0)
         FROM Subscriptions s
         JOIN Plans p ON s.plan_id = p.plan_id
         WHERE s.status = 'active') AS active_revenue,
        (SELECT COUNT(*) FROM WatchHistory) AS total_watch_events,
        (SELECT COUNT(*) FROM UserLogs) AS total_logs
    `);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/dau", async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        DATE(log_time) AS activity_date,
        COUNT(DISTINCT user_id) AS total_active_users
      FROM UserLogs
      GROUP BY DATE(log_time)
      ORDER BY activity_date ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/revenue-trend", async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        DATE_FORMAT(s.start_date, '%Y-%m') AS month,
        COUNT(s.subscription_id) AS total_subscriptions,
        COALESCE(SUM(p.price), 0) AS monthly_revenue
      FROM Subscriptions s
      JOIN Plans p ON s.plan_id = p.plan_id
      GROUP BY DATE_FORMAT(s.start_date, '%Y-%m')
      ORDER BY month ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/top-content", async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        c.content_id,
        c.title,
        c.genre,
        COUNT(w.watch_id) AS total_views
      FROM WatchHistory w
      JOIN Content c ON w.content_id = c.content_id
      GROUP BY c.content_id, c.title, c.genre
      ORDER BY total_views DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/churn", async (req, res) => {
  try {
    const rows = await query(`
      SELECT status, COUNT(*) AS number_of_users
      FROM Subscriptions
      GROUP BY status
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/genre-engagement", async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        c.genre,
        COUNT(w.watch_id) AS total_views,
        ROUND(AVG(w.watch_duration), 2) AS avg_watch_time
      FROM WatchHistory w
      JOIN Content c ON w.content_id = c.content_id
      GROUP BY c.genre
      ORDER BY total_views DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/active-users", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const rows = await query(
      `
      SELECT
        u.user_id,
        u.name,
        u.email,
        COUNT(l.log_id) AS activity_count,
        MAX(l.log_time) AS last_activity
      FROM Users u
      JOIN UserLogs l ON u.user_id = l.user_id
      WHERE u.name LIKE ?
         OR u.email LIKE ?
      GROUP BY u.user_id, u.name, u.email
      ORDER BY activity_count DESC
      LIMIT 25
      `,
      [`%${search}%`, `%${search}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
