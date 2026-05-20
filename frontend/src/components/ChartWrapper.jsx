const ChartWrapper = ({
  children,
  height = 320,
  className = "",
  ariaLabel = "Analytics chart",
}) => (
  <div
    className={`card-inner w-full min-w-0 max-w-full ${className}`}
    style={{ height: Math.max(height, 240) }}
    role="img"
    aria-label={ariaLabel}
  >
    <div className="h-full w-full min-w-0 max-w-full overflow-hidden">
      {children}
    </div>
  </div>
);

export default ChartWrapper;
