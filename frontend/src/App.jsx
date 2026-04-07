import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function StatCard({ label, value, sub }) {
  return (
    <div className="card stat-card">
      <p className="muted">{label}</p>
      <h3>{value}</h3>
      <p className="subtle">{sub}</p>
    </div>
  );
}

function SectionCard({ title, children, right }) {
  return (
    <section className="card panel">
      <div className="panel-head">
        <h2>{title}</h2>
        <div>{right}</div>
      </div>
      {children}
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [kpis, setKpis] = useState({});
  const [dau, setDau] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [churn, setChurn] = useState([]);
  const [genre, setGenre] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const dauRef = useRef(null);
  const revenueRef = useRef(null);
  const topRef = useRef(null);
  const churnRef = useRef(null);
  const genreRef = useRef(null);

  const charts = useRef({});

  const fetchAll = async () => {
    try {
      setRefreshing(true);
      const [k, d, r, t, c, g, u] = await Promise.all([
        fetch(`${API_BASE}/api/kpis`).then((x) => x.json()),
        fetch(`${API_BASE}/api/dau`).then((x) => x.json()),
        fetch(`${API_BASE}/api/revenue-trend`).then((x) => x.json()),
        fetch(`${API_BASE}/api/top-content`).then((x) => x.json()),
        fetch(`${API_BASE}/api/churn`).then((x) => x.json()),
        fetch(`${API_BASE}/api/genre-engagement`).then((x) => x.json()),
        fetch(`${API_BASE}/api/active-users?search=${encodeURIComponent(search)}`).then((x) => x.json()),
      ]);

      setKpis(k);
      setDau(d);
      setRevenue(r);
      setTopContent(t);
      setChurn(c);
      setGenre(g);
      setActiveUsers(u);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchAll();
    }, 60000);
    return () => clearInterval(id);
  }, [search]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!dauRef.current || !revenueRef.current || !topRef.current || !churnRef.current || !genreRef.current) {
      return;
    }

    const destroyChart = (key) => {
      if (charts.current[key]) charts.current[key].destroy();
    };

    destroyChart("dau");
    charts.current.dau = new Chart(dauRef.current, {
      type: "line",
      data: {
        labels: dau.map((x) => x.activity_date),
        datasets: [
          {
            label: "DAU",
            data: dau.map((x) => x.total_active_users),
            borderWidth: 2,
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    destroyChart("revenue");
    charts.current.revenue = new Chart(revenueRef.current, {
      type: "line",
      data: {
        labels: revenue.map((x) => x.month),
        datasets: [
          {
            label: "Monthly Revenue",
            data: revenue.map((x) => Number(x.monthly_revenue)),
            borderWidth: 2,
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    destroyChart("top");
    charts.current.top = new Chart(topRef.current, {
      type: "bar",
      data: {
        labels: topContent.map((x) => x.title),
        datasets: [
          {
            label: "Views",
            data: topContent.map((x) => x.total_views),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    destroyChart("churn");
    charts.current.churn = new Chart(churnRef.current, {
      type: "doughnut",
      data: {
        labels: churn.map((x) => x.status),
        datasets: [
          {
            data: churn.map((x) => x.number_of_users),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    destroyChart("genre");
    charts.current.genre = new Chart(genreRef.current, {
      type: "bar",
      data: {
        labels: genre.map((x) => x.genre),
        datasets: [
          {
            label: "Avg Watch Time",
            data: genre.map((x) => Number(x.avg_watch_time)),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      Object.values(charts.current).forEach((chart) => chart?.destroy?.());
    };
  }, [dau, revenue, topContent, churn, genre]);

  const filteredUsers = useMemo(() => {
    return activeUsers.filter((u) => {
      const term = search.toLowerCase();
      return (
        (u.name || "").toLowerCase().includes(term) ||
        (u.email || "").toLowerCase().includes(term)
      );
    });
  }, [activeUsers, search]);

  const refreshNow = async () => {
    await fetchAll();
  };

  const downloadCSV = () => {
    const header = ["user_id", "name", "email", "activity_count", "last_activity"];
    const rows = filteredUsers.map((u) => [
      u.user_id,
      `"${u.name}"`,
      `"${u.email}"`,
      u.activity_count,
      u.last_activity,
    ]);

    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "active_users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="brand">DBMS Dashboard</p>
          <h1>MySQL Analytics</h1>
          <p className="muted">
            Frontend for Users, Plans, Subscriptions, Content, WatchHistory, and UserLogs.
          </p>
        </div>

        <div className="sidebar-actions">
          <button className="btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
          <button className="btn" onClick={refreshNow}>
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </button>
          <button className="btn" onClick={downloadCSV}>
            Export CSV
          </button>
        </div>

        <label className="search">
          <span>Search users</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </label>
      </aside>

      <main className="main">
        <header className="hero card">
          <div>
            <p className="muted">Live DBMS analytics</p>
            <h2>Interactive dashboard with charts, filters, and exports</h2>
          </div>
          <div className="hero-meta">
            <span className="pill">{loading ? "Loading..." : "Ready"}</span>
            <span className="pill">Auto-refresh 60s</span>
          </div>
        </header>

        <section className="kpi-grid">
          <StatCard label="Total Users" value={kpis.total_users ?? 0} sub="From Users table" />
          <StatCard label="Active Subscriptions" value={kpis.active_subscriptions ?? 0} sub="Status = active" />
          <StatCard label="Active Revenue" value={money.format(kpis.active_revenue ?? 0)} sub="From active plans" />
          <StatCard label="Content Items" value={kpis.total_content ?? 0} sub="Movies, shows, docs" />
          <StatCard label="Watch Events" value={kpis.total_watch_events ?? 0} sub="WatchHistory rows" />
          <StatCard label="User Logs" value={kpis.total_logs ?? 0} sub="Login/logout/watch actions" />
        </section>

        <section className="chart-grid">
          <SectionCard title="Daily Active Users">
            <div className="chart-box">
              <canvas ref={dauRef} />
            </div>
          </SectionCard>

          <SectionCard title="Monthly Revenue Trend">
            <div className="chart-box">
              <canvas ref={revenueRef} />
            </div>
          </SectionCard>

          <SectionCard title="Top Watched Content">
            <div className="chart-box">
              <canvas ref={topRef} />
            </div>
          </SectionCard>

          <SectionCard title="Subscription Churn">
            <div className="chart-box">
              <canvas ref={churnRef} />
            </div>
          </SectionCard>

          <SectionCard title="Genre Engagement">
            <div className="chart-box">
              <canvas ref={genreRef} />
            </div>
          </SectionCard>
        </section>

        <SectionCard title="Most Active Users">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Activity Count</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.user_id}>
                    <td>{u.user_id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.activity_count}</td>
                    <td>{String(u.last_activity).replace("T", " ").slice(0, 19)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}

export default App;
