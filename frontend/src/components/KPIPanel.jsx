import AnimatedCounter from "./AnimatedCounter";
import { formatCurrency } from "../utils/formatters";

const KPIPanel = ({ data, valueKey = "total_revenue_generated" }) => {
  const value = data?.[0]?.[valueKey] ?? 0;

  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-red-500/15 bg-gradient-to-b from-red-500/10 to-transparent px-4 py-10 text-center sm:min-h-[240px]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        Total Value
      </p>
      <p className="mt-4 text-3xl font-bold tabular-nums text-white sm:text-4xl md:text-5xl">
        <AnimatedCounter value={value} formatter={(v) => formatCurrency(v)} />
      </p>
      <p className="mt-4 max-w-xs text-xs leading-relaxed text-gray-500 sm:text-sm">
        Sum of plan prices for active rows in Subscriptions.
      </p>
    </div>
  );
};

export default KPIPanel;
