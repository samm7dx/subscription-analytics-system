import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const StatCard = ({
  label,
  value,
  subtext,
  icon,
  delay = 0,
  formatValue,
}) => {
  const formatter =
    formatValue || ((v) => Math.round(v).toLocaleString());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-red-500/25 hover:shadow-[0_8px_32px_rgba(229,9,20,0.08)] md:p-6"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/[0.07] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            {label}
          </p>
          <p className="mt-2.5 text-2xl font-bold tabular-nums tracking-tight text-white md:text-[1.75rem]">
            <AnimatedCounter value={value} formatter={formatter} />
          </p>
          {subtext && (
            <p className="mt-2 text-xs leading-snug text-gray-500">{subtext}</p>
          )}
        </div>

        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/10 text-red-500 transition-colors group-hover:border-red-500/30 group-hover:bg-red-500/15">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
