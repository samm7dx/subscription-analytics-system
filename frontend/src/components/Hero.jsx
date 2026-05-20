import { motion } from "framer-motion";
import {
  PROJECT_NAME,
  PROJECT_SUBTITLE,
  HERO_DESCRIPTION,
} from "../constants/branding";

const Hero = () => {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[min(800px,90vw)] -translate-x-1/2 rounded-full bg-red-600/[0.08] blur-[100px]" />
        <div className="absolute -right-24 top-24 h-56 w-56 rounded-full bg-indigo-600/[0.07] blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400">
            {PROJECT_SUBTITLE}
          </p>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
            {PROJECT_NAME}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-gray-400 md:text-lg">
            {HERO_DESCRIPTION}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#knowledge")}
              className="rounded-xl bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition hover:bg-red-500"
            >
              Metric Reference
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#analytics")}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-gray-300 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              View Charts
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#overview")}
              className="rounded-xl border border-transparent px-8 py-3.5 text-sm font-medium text-gray-500 transition hover:text-gray-300"
            >
              Summary
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mx-auto mt-12 max-w-4xl md:mt-16"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-px shadow-2xl shadow-black/40 md:rounded-3xl">
            <div className="rounded-[15px] border border-white/[0.04] bg-[#0a0a0f]/95 p-4 md:rounded-[23px] md:p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500/80" />
                <span className="h-2 w-2 rounded-full bg-amber-500/50" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/40" />
                <span className="ml-2 font-mono text-[10px] text-gray-600">
                  dashboard.preview
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {["Revenue", "DAU", "Churn", "Engagement"].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-gray-600">
                      {label}
                    </p>
                    <div
                      className="mt-2 h-5 rounded bg-gradient-to-r from-red-600/35 to-transparent sm:h-6"
                      style={{ width: `${72 - i * 10}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 h-20 rounded-lg border border-white/[0.04] bg-gradient-to-t from-red-500/[0.08] to-transparent sm:h-24" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
