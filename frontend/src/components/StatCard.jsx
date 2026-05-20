import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const StatCard = ({ label, value, subtext, icon, delay = 0, formatValue }) => {
  const formatter =
    formatValue || ((v) => Math.round(v).toLocaleString());

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0c0c10]/70 p-5 shadow-md shadow-black/25 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
            {label}
          </p>
          <p className="mt-3 text-2xl font-bold tabular-nums leading-none text-white sm:text-3xl">
            <AnimatedCounter value={value} formatter={formatter} />
          </p>
          {subtext && (
            <p className="mt-2 text-xs leading-snug text-gray-500">{subtext}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 sm:h-11 sm:w-11">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
