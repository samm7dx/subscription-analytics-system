import { useState, useRef } from "react";
import Chart from "chart.js/auto";

const API = "http://localhost:3001";

function App() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const runQuery = async (type) => {
    const res = await fetch(`${API}/api/run-query/${type}`);
    const result = await res.json();

    setData(result);

    // destroy old chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (result.length > 0) {
      const keys = Object.keys(result[0]);

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: result.map(r => r[keys[0]]),
          datasets: [{
            label: keys[1],
            data: result.map(r => r[keys[1]])
          }]
        }
      });
    }
  };

  return (
    <div style={{ padding: "20px", background: "#0f172a", color: "white" }}>
      <h1>Analytics Query Dashboard</h1>

      <div>
        <button onClick={() => runQuery("dau")}>DAU</button>
        <button onClick={() => runQuery("revenue")}>Revenue</button>
        <button onClick={() => runQuery("top")}>Top Content</button>
      </div>

      <h2>Chart</h2>
      <canvas ref={chartRef}></canvas>

      <h2>Table</h2>
      <table>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;