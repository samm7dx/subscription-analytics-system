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
      className="relative overflow-hidden border-b border-white/[0.04] pb-16 pt-24 sm:pb-20 sm:pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[min(400px,70vh)] w-[min(720px,95vw)] -translate-x-1/2 rounded-full bg-red-600/[0.07] blur-[100px]" />
      </div>

      <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-400"
          >
            {PROJECT_SUBTITLE}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {PROJECT_NAME}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl break-words text-sm leading-relaxed text-gray-400 sm:text-base md:mt-6 md:text-lg"
          >
            {HERO_DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo("#knowledge")}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-500"
            >
              Metric Reference
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#analytics")}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/[0.08]"
            >
              View Charts
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#overview")}
              className="px-6 py-3 text-sm font-medium text-gray-500 transition hover:text-gray-300"
            >
              Summary
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl lg:mt-14"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/90 p-4 shadow-xl shadow-black/40 sm:p-6">
            <div className="mb-4 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
              <span className="ml-2 font-mono text-[10px] text-gray-600">preview</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Revenue", "DAU", "Churn", "Engagement"].map((label) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3"
                >
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {label}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-red-600/40" />
                </div>
              ))}
            </div>
            <div className="mt-3 h-16 rounded-lg bg-gradient-to-r from-red-600/15 to-transparent sm:h-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
