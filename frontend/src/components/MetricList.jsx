export default function MetricList({ metrics, activeId, onSelect }) {
  return (
    <div className="term-section">
      <div className="term-sectionTitle">commands</div>
      <div className="term-list">
        {metrics.map((m) => (
          <button
            key={m.id}
            className={`term-item ${activeId === m.id ? "is-active" : ""}`}
            onClick={() => onSelect(m)}
            type="button"
          >
            <span className="term-itemName">{m.title}</span>
            <span className="term-itemHint">{m.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

