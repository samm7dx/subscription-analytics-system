const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./config/db");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const app = express();

const allowedOrigins = [
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : []),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "Subscription Analytic System",
    type: "DBMS Project API",
    status: "running",
    docs: "/api/analytics",
  });
});

app.get("/health", (req, res) => {
  db.query("SELECT 1 AS ok", (err) => {
    if (err) {
      return res.status(503).json({
        status: "error",
        database: "disconnected",
        message: err.message,
      });
    }
    res.json({ status: "ok", database: "connected" });
  });
});

app.use("/api/analytics", analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy blocked this origin" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
