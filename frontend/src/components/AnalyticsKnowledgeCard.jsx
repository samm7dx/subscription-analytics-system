import { motion, AnimatePresence } from "framer-motion";
import AnalyticsMetricIcon from "./AnalyticsMetricIcon";
import KnowledgeInfoBlock from "./KnowledgeInfoBlock";
import {
  scrollToAnalyticsChart,
  scrollToAnalyticsQuery,
} from "../utils/scrollToSection";

const AnalyticsKnowledgeCard = ({
  metric,
  isOpen,
  onToggle,
}) => {
  const {
    key,
    title,
    chartType,
    definition,
    whyItMatters,
    sqlExplanation,
    schema,
    exampleInsight,
  } = metric;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-red-500/25 bg-white/[0.04] shadow-[0_0_0_1px_rgba(229,9,20,0.08)]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors md:px-6 md:py-5"
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            isOpen
              ? "border-red-500/30 bg-red-500/15"
              : "border-white/10 bg-white/[0.04]"
          }`}
        >
          <AnalyticsMetricIcon metricKey={key} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight text-white md:text-lg">
              {title}
            </h3>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
              {chartType}
            </span>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
            {definition}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-gray-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/[0.06] px-5 pb-5 pt-4 md:px-6 md:pb-6">
              <KnowledgeInfoBlock label="Definition">{definition}</KnowledgeInfoBlock>

              <KnowledgeInfoBlock label="Importance">{whyItMatters}</KnowledgeInfoBlock>

              <KnowledgeInfoBlock label="SQL Logic Explanation">
                <code className="block rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-gray-400">
                  {sqlExplanation}
                </code>
              </KnowledgeInfoBlock>

              <KnowledgeInfoBlock label="Schema Reference">
                <div className="space-y-3">
                  {schema.map((ref) => (
                    <div key={ref.table}>
                      <p className="font-medium text-white">
                        Table:{" "}
                        <span className="text-red-400">{ref.table}</span>
                      </p>
                      <p className="mt-1.5 text-xs text-gray-500">Attributes:</p>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {ref.attributes.map((attr) => (
                          <li
                            key={attr}
                            className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[11px] text-gray-400"
                          >
                            {attr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </KnowledgeInfoBlock>

              <KnowledgeInfoBlock label="Example Insight" variant="insight">
                {exampleInsight}
              </KnowledgeInfoBlock>

              <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => scrollToAnalyticsChart(key)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Chart
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnalyticsQuery(key)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View SQL Query
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsKnowledgeCard;
