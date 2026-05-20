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
      className="relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[min(420px,70vh)] w-[min(800px,92vw)] -translate-x-1/2 rounded-full bg-red-600/[0.08] blur-[100px]" />
        <div className="absolute -right-24 top-24 hidden h-56 w-56 rounded-full bg-indigo-600/[0.07] blur-[90px] sm:block" />
      </div>

      <div className="page-container relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center sm:max-w-4xl"
        >
          <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-400 sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
            {PROJECT_SUBTITLE}
          </p>

          <h1 className="break-words text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {PROJECT_NAME}
          </h1>

          <p className="mx-auto mt-5 max-w-xl break-words text-sm leading-relaxed text-gray-400 sm:mt-6 sm:max-w-2xl sm:text-base md:text-lg">
            {HERO_DESCRIPTION}
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <button
              type="button"
              onClick={() => scrollTo("#knowledge")}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition hover:bg-red-500 sm:px-8 sm:py-3.5"
            >
              Metric Reference
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#analytics")}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:px-8 sm:py-3.5"
            >
              View Charts
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#overview")}
              className="rounded-xl px-6 py-3 text-sm font-medium text-gray-500 transition hover:text-gray-300 sm:py-3.5"
            >
              Summary
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mx-auto mt-10 max-w-3xl sm:mt-12 md:mt-16 lg:max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-px shadow-2xl shadow-black/40 md:rounded-3xl">
            <div className="rounded-[14px] border border-white/[0.04] bg-[#0a0a0f]/95 p-4 sm:p-5 md:rounded-[23px] md:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500/80" />
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500/50" />
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/40" />
                <span className="ml-1 truncate font-mono text-[10px] text-gray-600">
                  dashboard.preview
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {["Revenue", "DAU", "Churn", "Engagement"].map((label, i) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2 sm:px-3 sm:py-2.5"
                  >
                    <p className="truncate text-[10px] uppercase tracking-wider text-gray-600">
                      {label}
                    </p>
                    <div
                      className="mt-2 h-5 rounded bg-gradient-to-r from-red-600/35 to-transparent sm:h-6"
                      style={{ width: `${72 - i * 10}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 h-16 rounded-lg border border-white/[0.04] bg-gradient-to-t from-red-500/[0.08] to-transparent sm:h-20 md:h-24" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
