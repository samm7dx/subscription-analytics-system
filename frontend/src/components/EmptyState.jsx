import { motion } from "framer-motion";

const EmptyState = ({
  title = "No data available",
  message = "Data will appear when the API returns query results.",
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center sm:min-h-[200px] sm:rounded-2xl sm:px-6 sm:py-12"
  >
    <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 sm:h-12 sm:w-12">
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    </div>
    <h4 className="text-base font-medium text-white">{title}</h4>
    <p className="mt-2 max-w-sm break-words text-sm leading-relaxed text-gray-500">
      {message}
    </p>
  </motion.div>
);

export default EmptyState;
