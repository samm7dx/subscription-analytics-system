import AnimatedCounter from "./AnimatedCounter";
import { formatCurrency } from "../utils/formatters";

const KPIPanel = ({ data, valueKey = "total_revenue_generated" }) => {
  const row = data?.[0];
  const value = row?.[valueKey] ?? 0;

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-gradient-to-br from-red-500/10 via-transparent to-transparent px-6 py-10 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        Total Value
      </p>
      <p className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
        <AnimatedCounter
          value={value}
          formatter={(v) => formatCurrency(v)}
        />
      </p>
      <p className="mt-3 max-w-xs text-sm text-gray-500">
        Sum of plan prices for active rows in Subscriptions.
      </p>
    </div>
  );
};

export default KPIPanel;
