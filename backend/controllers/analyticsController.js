import { query } from "../db.js";
import { getMetric, listMetrics } from "../analytics/metrics.js";

function sendError(res, status, message, details = undefined) {
  return res.status(status).json({
    ok: false,
    error: { message, ...(details ? { details } : {}) },
  });
}

export const listAnalyticsMetrics = async (req, res) => {
  res.json({ ok: true, metrics: listMetrics() });
};

export const runAnalyticsMetric = async (req, res) => {
  try {
    const { metric } = req.params;
    const m = getMetric(metric);

    if (!m) {
      return sendError(res, 400, `Unknown metric '${metric}'`, {
        available: listMetrics().map((x) => x.id),
      });
    }

    const rows = await query(m.sql);
    res.json({
      ok: true,
      metric: {
        id: m.id,
        title: m.title,
        description: m.description,
        why: m.why,
        unit: m.unit,
        recommendedChart: m.recommendedChart,
      },
      data: rows,
    });
  } catch (err) {
    return sendError(res, 500, "Failed to run analytics metric", {
      message: err?.message,
    });
  }
};

// Backward-compatible endpoint for the old UI: /api/run-query/:type
export const runQuery = async (req, res) => {
  const { type } = req.params;
  const metricMap = {
    dau: "dau",
    revenue: "monthly_revenue",
    top: "top_content",
  };

  req.params.metric = metricMap[type] ?? type;
  return runAnalyticsMetric(req, res);
};
