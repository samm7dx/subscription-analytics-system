import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function asNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function buildChart(metric, rows) {
  const id = metric?.id;

  if (id === "dau") {
    const labels = rows.map((r) => r.date);
    const values = rows.map((r) => asNumber(r.users));
    return {
      kind: "line",
      data: {
        labels,
        datasets: [
          {
            label: "DAU",
            data: values,
            borderColor: "#00ff9c",
            backgroundColor: "rgba(0,255,156,0.18)",
            tension: 0.35,
            fill: true,
            pointRadius: 2,
          },
        ],
      },
    };
  }

  if (id === "monthly_revenue") {
    const labels = rows.map((r) => r.month);
    const values = rows.map((r) => asNumber(r.monthly_revenue));
    return {
      kind: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Monthly revenue",
            data: values,
            borderColor: "#60a5fa",
            backgroundColor: "rgba(96,165,250,0.15)",
            tension: 0.35,
            fill: true,
            pointRadius: 2,
          },
        ],
      },
    };
  }

  if (id === "top_content") {
    const labels = rows.map((r) => r.title);
    const values = rows.map((r) => asNumber(r.total_views));
    return {
      kind: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Views",
            data: values,
            backgroundColor: "rgba(192,132,252,0.35)",
            borderColor: "rgba(192,132,252,0.9)",
            borderWidth: 1,
          },
        ],
      },
    };
  }

  if (id === "most_active_users") {
    const labels = rows.map((r) => r.name);
    const values = rows.map((r) => asNumber(r.activity_count));
    return {
      kind: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Activity events",
            data: values,
            backgroundColor: "rgba(251,191,36,0.35)",
            borderColor: "rgba(251,191,36,0.95)",
            borderWidth: 1,
          },
        ],
      },
    };
  }

  if (id === "engagement_by_user") {
    const labels = rows.map((r) => r.name);
    const values = rows.map((r) => asNumber(r.average_watch_time));
    return {
      kind: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Avg watch time (min)",
            data: values,
            backgroundColor: "rgba(34,197,94,0.25)",
            borderColor: "rgba(34,197,94,0.9)",
            borderWidth: 1,
          },
        ],
      },
    };
  }

  if (id === "genre_engagement") {
    const labels = rows.map((r) => r.genre);
    const values = rows.map((r) => asNumber(r.total_views));
    return {
      kind: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Views",
            data: values,
            backgroundColor: "rgba(244,63,94,0.25)",
            borderColor: "rgba(244,63,94,0.9)",
            borderWidth: 1,
          },
        ],
      },
    };
  }

  if (id === "churn_status") {
    const labels = rows.map((r) => r.status);
    const values = rows.map((r) => asNumber(r.number_of_users));
    return {
      kind: "doughnut",
      data: {
        labels,
        datasets: [
          {
            label: "Subscriptions",
            data: values,
            backgroundColor: [
              "rgba(0,255,156,0.28)",
              "rgba(96,165,250,0.28)",
              "rgba(244,63,94,0.28)",
            ],
            borderColor: [
              "rgba(0,255,156,0.95)",
              "rgba(96,165,250,0.95)",
              "rgba(244,63,94,0.95)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }

  return { kind: "none", data: null };
}

export default function ChartPanel({ metric, rows }) {
  const { kind, data } = buildChart(metric, rows);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 700, easing: "easeOutQuart" },
    plugins: {
      legend: { labels: { color: "#cbd5e1" } },
      tooltip: { enabled: true },
    },
    scales:
      kind === "doughnut"
        ? undefined
        : {
            x: { ticks: { color: "#94a3b8" }, grid: { color: "#1f2937" } },
            y: { ticks: { color: "#94a3b8" }, grid: { color: "#1f2937" } },
          },
  };

  return (
    <div className="term-section">
      <div className="term-sectionTitle">visual</div>
      <div className="term-chart">
        {kind === "line" ? <Line data={data} options={options} /> : null}
        {kind === "bar" ? <Bar data={data} options={options} /> : null}
        {kind === "doughnut" ? <Doughnut data={data} options={options} /> : null}
        {kind === "none" ? (
          <div className="term-muted">No chart mapping for this metric yet.</div>
        ) : null}
      </div>
    </div>
  );
}

