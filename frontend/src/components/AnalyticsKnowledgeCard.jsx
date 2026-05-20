import { motion, AnimatePresence } from "framer-motion";
import AnalyticsMetricIcon from "./AnalyticsMetricIcon";
import KnowledgeInfoBlock from "./KnowledgeInfoBlock";
import {
  scrollToAnalyticsChart,
  scrollToAnalyticsQuery,
} from "../utils/scrollToSection";

const AnalyticsKnowledgeCard = ({ metric, isOpen, onToggle }) => {
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
      className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
        isOpen
          ? "border-red-500/25 bg-white/[0.04] shadow-[0_0_0_1px_rgba(229,9,20,0.08)]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-4 py-4 text-left transition-colors sm:gap-4 sm:px-5 sm:py-5 md:px-6"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors sm:h-11 sm:w-11 ${
            isOpen
              ? "border-red-500/30 bg-red-500/15"
              : "border-white/10 bg-white/[0.04]"
          }`}
        >
          <AnalyticsMetricIcon metricKey={key} />
        </span>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <h3 className="break-words text-sm font-semibold leading-snug text-white sm:text-base md:text-lg">
              {title}
            </h3>
            <span className="w-fit shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
              {chartType}
            </span>
          </div>
          <p
            className={`text-sm leading-relaxed text-gray-500 ${
              isOpen ? "" : "line-clamp-2"
            }`}
          >
            {definition}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-gray-500"
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
            <div className="space-y-3 border-t border-white/[0.06] px-4 pb-4 pt-3 sm:space-y-4 sm:px-5 sm:pb-5 sm:pt-4 md:px-6 md:pb-6">
              <KnowledgeInfoBlock label="Definition">{definition}</KnowledgeInfoBlock>
              <KnowledgeInfoBlock label="Importance">{whyItMatters}</KnowledgeInfoBlock>
              <KnowledgeInfoBlock label="SQL Logic Explanation">
                <code className="block break-words rounded-lg bg-black/30 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-400">
                  {sqlExplanation}
                </code>
              </KnowledgeInfoBlock>
              <KnowledgeInfoBlock label="Schema Reference">
                <div className="space-y-3">
                  {schema.map((ref) => (
                    <div key={ref.table} className="min-w-0">
                      <p className="break-words font-medium text-white">
                        Table: <span className="text-red-400">{ref.table}</span>
                      </p>
                      <p className="mt-1.5 text-xs text-gray-500">Attributes:</p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {ref.attributes.map((attr) => (
                          <li
                            key={attr}
                            className="max-w-full break-all rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[11px] text-gray-400"
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
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
                >
                  View Chart
                </button>
                <button
                  type="button"
                  onClick={() => scrollToAnalyticsQuery(key)}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:text-white"
                >
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
