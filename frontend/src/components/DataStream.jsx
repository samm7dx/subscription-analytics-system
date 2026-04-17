import { useEffect, useState } from "react";

export default function DataStream({ data }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    let i = 0;
    const batchSize = 20;

    const interval = setInterval(() => {
      setVisible((prev) => [
        ...prev,
        ...data.slice(i, i + batchSize)
      ]);
      i += batchSize;

      if (i >= data.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="stream-box">
      {visible.map((row, idx) => (
        <div key={idx}>{JSON.stringify(row)}</div>
      ))}
    </div>
  );
}
