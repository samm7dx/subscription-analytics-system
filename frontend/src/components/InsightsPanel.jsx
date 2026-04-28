function asNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function summarize(metric, rows) {
  const id = metric?.id;

  if (!rows || rows.length === 0) return [];

  if (id === "dau") {
    const values = rows.map((r) => asNumber(r.users));
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return [
      { k: "days", v: String(values.length) },
      { k: "avg_dau", v: avg.toFixed(1) },
      { k: "min_dau", v: String(min) },
      { k: "max_dau", v: String(max) },
    ];
  }

  if (id === "monthly_revenue") {
    const values = rows.map((r) => asNumber(r.monthly_revenue));
    const total = values.reduce((a, b) => a + b, 0);
    const last = values.at(-1) ?? 0;
    return [
      { k: "months", v: String(values.length) },
      { k: "total", v: total.toFixed(0) },
      { k: "latest_month", v: String(last.toFixed(0)) },
    ];
  }

  if (id === "top_content") {
    const top = rows[0];
    const totalViews = rows.reduce((a, r) => a + asNumber(r.total_views), 0);
    return [
      { k: "top_title", v: String(top?.title ?? "-") },
      { k: "top_views", v: String(asNumber(top?.total_views)) },
      { k: "top10_total_views", v: String(totalViews) },
    ];
  }

  if (id === "churn_status") {
    const total = rows.reduce((a, r) => a + asNumber(r.number_of_users), 0);
    const active = rows.find((r) => r.status === "active");
    const activePct = total ? (asNumber(active?.number_of_users) / total) * 100 : 0;
    return [
      { k: "total_subs", v: String(total) },
      { k: "active_pct", v: `${activePct.toFixed(1)}%` },
    ];
  }

  if (id === "genre_engagement") {
    const top = rows[0];
    return [
      { k: "top_genre", v: String(top?.genre ?? "-") },
      { k: "top_views", v: String(asNumber(top?.total_views)) },
      { k: "avg_watch_time", v: String(asNumber(top?.avg_watch_time).toFixed(1)) },
    ];
  }

  if (id === "most_active_users") {
    const top = rows[0];
    return [
      { k: "top_user", v: String(top?.name ?? "-") },
      { k: "events", v: String(asNumber(top?.activity_count)) },
    ];
  }

  if (id === "engagement_by_user") {
    const top = rows[0];
    return [
      { k: "top_user", v: String(top?.name ?? "-") },
      { k: "avg_watch_time", v: String(asNumber(top?.average_watch_time).toFixed(1)) },
      { k: "sessions", v: String(asNumber(top?.total_sessions)) },
    ];
  }

  if (id === "total_active_revenue") {
    const v = rows[0]?.total_revenue_generated;
    return [{ k: "active_revenue", v: String(asNumber(v).toFixed(0)) }];
  }

  return [];
}

export default function InsightsPanel({ metric, rows }) {
  const items = summarize(metric, rows);

  return (
    <div className="term-section">
      <div className="term-sectionTitle">insights</div>
      {items.length === 0 ? (
        <div className="term-muted">Select a metric to see insights.</div>
      ) : (
        <div className="term-kv">
          {items.map((it) => (
            <div key={it.k} className="term-kvRow">
              <div className="term-kvKey">{it.k}</div>
              <div className="term-kvVal">{it.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

