import { motion } from "framer-motion";

const chartTypeLabels = {
  line: "Line Chart",
  area: "Area Chart",
  bar: "Bar Chart",
  pie: "Pie Chart",
  doughnut: "Doughnut Chart",
  kpi: "KPI",
  leaderboard: "Leaderboard",
};

const AnalyticsCard = ({
  id,
  title,
  description,
  chartType,
  generatedFrom,
  children,
  className = "",
  delay = 0,
  span = "default",
}) => {
  const spanClass =
    span === "full"
      ? "lg:col-span-2"
      : span === "wide"
        ? "lg:col-span-2"
        : "";

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
      className={`group flex min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/10 hover:shadow-[0_12px_48px_rgba(0,0,0,0.45)] ${spanClass} ${className}`}
    >
      <div className="border-b border-white/[0.05] px-5 py-5 md:px-7 md:py-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-base">
              {description}
            </p>
          </div>
          {chartType && (
            <span className="shrink-0 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
              {chartTypeLabels[chartType] || chartType}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-5 py-5 md:gap-7 md:px-7 md:py-6">
        <div className="flex min-w-0 flex-col gap-6">
          {children}
        </div>

        {generatedFrom && (
          <footer className="border-t border-white/[0.05] pt-4">
            <p className="text-xs leading-relaxed text-gray-500">
              <span className="font-medium text-red-500/90">Data source: </span>
              {generatedFrom}
            </p>
          </footer>
        )}
      </div>
    </motion.article>
  );
};

export default AnalyticsCard;
