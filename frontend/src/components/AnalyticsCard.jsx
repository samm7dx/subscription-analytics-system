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
    span === "full" || span === "wide" ? "lg:col-span-2" : "";

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={`group flex min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 md:hover:border-white/10 md:rounded-3xl ${spanClass} ${className}`}
    >
      <div className="border-b border-white/[0.05] px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="break-words text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl md:text-2xl">
              {title}
            </h3>
            <p className="break-words text-sm leading-relaxed text-gray-400">
              {description}
            </p>
          </div>
          {chartType && (
            <span className="w-fit shrink-0 self-start rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400 sm:px-3">
              {chartTypeLabels[chartType] || chartType}
            </span>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 px-4 py-4 sm:gap-6 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="flex min-w-0 flex-col gap-5 sm:gap-6">{children}</div>

        {generatedFrom && (
          <footer className="border-t border-white/[0.05] pt-4">
            <p className="break-words text-xs leading-relaxed text-gray-500">
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
