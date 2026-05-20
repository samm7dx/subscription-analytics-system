import AnimatedCounter from "./AnimatedCounter";
import { formatCurrency } from "../utils/formatters";

const KPIPanel = ({ data, valueKey = "total_revenue_generated" }) => {
  const row = data?.[0];
  const value = row?.[valueKey] ?? 0;

  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-red-500/10 via-transparent to-transparent px-4 py-8 text-center sm:min-h-[200px] sm:rounded-2xl sm:px-6 sm:py-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
        Total Value
      </p>
      <p className="mt-3 max-w-full break-words text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        <AnimatedCounter value={value} formatter={(v) => formatCurrency(v)} />
      </p>
      <p className="mt-3 max-w-xs break-words px-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
        Sum of plan prices for active rows in Subscriptions.
      </p>
    </div>
  );
};

export default KPIPanel;
