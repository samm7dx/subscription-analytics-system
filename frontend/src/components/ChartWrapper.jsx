const ChartWrapper = ({
  children,
  height = 320,
  className = "",
  ariaLabel = "Analytics chart",
}) => {
  const chartHeight = Math.max(height, 260);

  return (
    <div
      className={`chart-panel relative w-full min-w-0 ${className}`}
      style={{ height: chartHeight, minHeight: chartHeight }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="absolute inset-0 rounded-xl border border-white/[0.04] bg-[#0a0a0f]/60 sm:rounded-2xl"
        aria-hidden="true"
      />
      <div className="relative z-10 h-full w-full min-h-0 min-w-0 p-2 sm:p-3">
        {children}
      </div>
    </div>
  );
};

export default ChartWrapper;
