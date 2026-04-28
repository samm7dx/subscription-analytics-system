import express from "express";
import {
  listAnalyticsMetrics,
  runAnalyticsMetric,
  runQuery,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/analytics/metrics", listAnalyticsMetrics);
router.get("/analytics/:metric", runAnalyticsMetric);

// Backward compatible
router.get("/run-query/:type", runQuery);

export default router;
