import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { query } from "./db.js";

dotenv.config();

const app = express();   // ✅ app defined HERE
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"]
}));
app.use(express.json());

/* ---------------- EXISTING ROUTES ---------------- */

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API running" });
});

/* ---------------- ADD YOUR NEW ROUTE HERE ---------------- */

import analyticsRoutes from "./routes/analyticsRoutes.js";

app.use("/api", analyticsRoutes);

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
