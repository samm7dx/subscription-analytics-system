import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import AnalyticsKnowledgeCard from "./AnalyticsKnowledgeCard";
import { analyticsKnowledge } from "../data/analyticsKnowledge";
import { PROJECT_SUBTITLE } from "../constants/branding";

const AnalyticsKnowledgeCenter = () => {
  const [openKey, setOpenKey] = useState(analyticsKnowledge[0]?.key ?? null);

  const handleToggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <section
      id="knowledge"
      className="scroll-mt-28 border-y border-white/[0.04] bg-[#06060a]/80 py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow={PROJECT_SUBTITLE}
          title="Metric Reference"
          description="Definitions, schema mapping, and SQL logic for each analytics query used in this dashboard."
        />

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-wrap items-center justify-center gap-3 text-center"
          >
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
              {analyticsKnowledge.length} metrics documented
            </span>
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400">
              Select a card to expand
            </span>
          </motion.div>

          <div className="flex flex-col gap-3">
            {analyticsKnowledge.map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <AnalyticsKnowledgeCard
                  metric={metric}
                  isOpen={openKey === metric.key}
                  onToggle={() => handleToggle(metric.key)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsKnowledgeCenter;
