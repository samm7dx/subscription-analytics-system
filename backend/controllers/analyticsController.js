
const db = require("../db");
const fs = require("fs");
const path = require("path");

// Load SQL file once
const queries = fs.readFileSync(
  path.join(__dirname, "../../analytics/queries.sql"),
  "utf-8"
);

exports.runQuery = async (req, res) => {
  const { type } = req.params;

  try {
    let query = "";

    if (type === "dau") {
      query = `
        SELECT DATE(log_time) AS date,
               COUNT(DISTINCT user_id) AS dau
        FROM logs
        GROUP BY date
        ORDER BY date;
      `;
    }

    // 👉 Add more mappings later

    const result = await db.query(query);
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
