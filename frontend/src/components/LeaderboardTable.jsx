import { motion } from "framer-motion";
import { formatNumber } from "../utils/formatters";

const LeaderboardTable = ({ data, nameKey = "name", valueKey = "activity_count" }) => {
  if (!data?.length) return null;

  const maxValue = Math.max(...data.map((row) => Number(row[valueKey]) || 0));

  return (
    <div className="card-inner -mx-1 overflow-x-auto rounded-xl border border-white/[0.06] sm:mx-0">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02] text-xs uppercase tracking-wider text-gray-500">
            <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">Rank</th>
            <th className="px-3 py-3 font-medium sm:px-4">User</th>
            <th className="whitespace-nowrap px-3 py-3 text-right font-medium sm:px-4">Activity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const value = Number(row[valueKey]) || 0;
            const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;

            return (
              <motion.tr
                key={row.user_id ?? index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
              >
                <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-3.5">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold ${
                      index === 0
                        ? "bg-red-500/20 text-red-400"
                        : "bg-white/[0.04] text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="min-w-0 px-3 py-3 sm:px-4 sm:py-3.5">
                  <div className="truncate font-medium text-white sm:max-w-[200px]">
                    {row[nameKey]}
                  </div>
                  <div className="mt-1.5 h-1 w-full max-w-[160px] overflow-hidden rounded-full bg-white/[0.06] sm:max-w-[180px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right font-semibold tabular-nums text-gray-200 sm:px-4 sm:py-3.5">
                  {formatNumber(value)}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
