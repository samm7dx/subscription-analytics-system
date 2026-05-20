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
  const spanClass = span === "full" || span === "wide" ? "lg:col-span-2" : "";

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.45, delay }}
      className={`group flex min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c10]/80 shadow-lg shadow-black/30 backdrop-blur-sm md:rounded-3xl ${spanClass} ${className}`}
    >
      <header className="border-b border-white/[0.06] px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="break-words text-lg font-semibold leading-snug text-white sm:text-xl">
              {title}
            </h3>
            <p className="break-words text-sm leading-relaxed text-gray-400">
              {description}
            </p>
          </div>
          {chartType && (
            <span className="w-fit shrink-0 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
              {chartTypeLabels[chartType] || chartType}
            </span>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-6 px-4 py-5 sm:gap-7 sm:px-6 sm:py-6">
        {children}

        {generatedFrom && (
          <footer className="border-t border-white/[0.06] pt-4">
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
