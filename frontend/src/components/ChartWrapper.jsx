const ChartWrapper = ({
  children,
  height = 320,
  className = "",
  ariaLabel = "Analytics chart",
}) => (
  <div
    className={`w-full min-w-0 ${className}`}
    style={{ height }}
    role="img"
    aria-label={ariaLabel}
  >
    <div className="h-full w-full [&_.recharts-surface]:overflow-visible">
      {children}
    </div>
  </div>
);

export default ChartWrapper;
