import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { query } from "./db.js";

dotenv.config();

const app = express();   // ✅ app defined HERE
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ---------------- EXISTING ROUTES ---------------- */

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API running" });
});

/* ---------------- ADD YOUR NEW ROUTE HERE ---------------- */

app.get("/api/run-query/:type", async (req, res) => {
  try {
    const type = req.params.type;

    let sql = "";

    if (type === "dau") {
      sql = `
        SELECT DATE(log_time) AS date,
        COUNT(DISTINCT user_id) AS users
        FROM UserLogs
        GROUP BY date
      `;
    }

    else if (type === "revenue") {
      sql = `
        SELECT DATE_FORMAT(start_date, '%Y-%m') AS month,
        SUM(p.price) AS revenue
        FROM Subscriptions s
        JOIN Plans p ON s.plan_id = p.plan_id
        GROUP BY month
      `;
    }

    else if (type === "top") {
      sql = `
        SELECT c.title, COUNT(*) AS views
        FROM WatchHistory w
        JOIN Content c ON w.content_id = c.content_id
        GROUP BY c.title
        ORDER BY views DESC
        LIMIT 10
      `;
    }

    const data = await query(sql);
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});