import { useEffect, useMemo, useState } from "react";
import { metrics } from "./config/metricsConfig";
import { apiGet } from "./services/api";
import DataStream from "./components/DataStream";
import TerminalLayout from "./components/TerminalLayout";
import MetricList from "./components/MetricList";
import ChartPanel from "./components/ChartPanel";
import InsightsPanel from "./components/InsightsPanel";

function App() {
  const [rows, setRows] = useState([]);
  const [metric, setMetric] = useState(null); // backend-provided meta
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [log, setLog] = useState([]);

  const logLines = useMemo(
    () =>
      log.map((x) => ({
        ts: x.ts,
        level: x.level,
        msg: x.msg,
      })),
    [log]
  );

  function pushLog(level, msg) {
    setLog((prev) => [
      ...prev.slice(Math.max(0, prev.length - 300)),
      { ts: new Date().toISOString(), level, msg },
    ]);
  }

  useEffect(() => {
    pushLog("info", "ready: select a metric command on the left");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (m) => {
    setLoading(true);
    setError(null);
    setRows([]);
    pushLog("cmd", `run ${m.api}`);
    try {
      const res = await apiGet(m.api);
      if (res?.ok === false) throw new Error(res?.error?.message || "API error");
      setMetric(res.metric ?? m);
      setRows(res.data ?? res);
      pushLog("ok", `done: ${m.id} (${(res.data ?? res)?.length ?? 0} rows)`);
    } catch (e) {
      setError(e?.message || "Request failed");
      pushLog("err", `error: ${e?.message || "Request failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TerminalLayout
      title="subscription-analytics"
      subtitle={loading ? "running..." : "demo mode"}
      left={
        <MetricList
          metrics={metrics}
          activeId={metric?.id}
          onSelect={handleClick}
        />
      }
      main={
        <div className="term-stack">
          <div className="term-section">
            <div className="term-sectionTitle">explain</div>
            <div className="term-explainTitle">
              {metric?.title ?? "Select a metric"}
            </div>
            {metric?.description ? (
              <div className="term-explainText">{metric.description}</div>
            ) : null}
            {metric?.why ? (
              <div className="term-explainText">
                <span className="term-dim">why:</span> {metric.why}
              </div>
            ) : null}
            {error ? <div className="term-error">{error}</div> : null}
          </div>

          <ChartPanel metric={metric} rows={rows} />
        </div>
      }
      right={<InsightsPanel metric={metric} rows={rows} />}
      bottom={
        <div className="term-section">
          <div className="term-sectionTitle">logs</div>
          <DataStream data={logLines} />
        </div>
      }
    />
  );
}

export default App;
