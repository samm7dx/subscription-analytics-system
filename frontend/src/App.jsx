import { useState } from "react";
import { metrics } from "./config/metricsConfig";
import { runQuery } from "./services/api";
import DataStream from "./components/DataStream";

function App() {
  const [data, setData] = useState([]);
  const [metric, setMetric] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (m) => {
    setMetric(m);
    setLoading(true);
    const res = await runQuery(m.api);
    setData(res);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Analytics Dashboard</h1>

      <div className="buttons">
        {metrics.map((m) => (
          <button key={m.id} onClick={() => handleClick(m)}>
            {m.title}
          </button>
        ))}
      </div>

      {metric && (
        <div className="output">
          <h2>{metric.title}</h2>
          <p>{metric.description}</p>
          <p><b>Why:</b> {metric.why}</p>

          {loading ? <p>Loading...</p> : <DataStream data={data} />}
        </div>
      )}
    </div>
  );
}

export default App;
