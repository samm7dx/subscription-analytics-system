const LoadingSkeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-lg bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] ${className}`}
    aria-hidden="true"
  />
);

export const StatCardSkeleton = () => (
  <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#0c0c10]/50 p-5 sm:p-6">
    <LoadingSkeleton className="mb-3 h-3 w-24" />
    <LoadingSkeleton className="mb-2 h-9 w-32" />
    <LoadingSkeleton className="h-3 w-28" />
  </div>
);

export const AnalyticsCardSkeleton = ({ tall = false }) => (
  <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c10]/50 md:rounded-3xl">
    <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6 sm:py-6">
      <LoadingSkeleton className="mb-3 h-4 w-32" />
      <LoadingSkeleton className="h-5 w-4/5 max-w-sm" />
    </div>
    <div className="space-y-5 px-5 py-5 sm:space-y-6 sm:px-6 sm:py-6">
      <LoadingSkeleton className={`w-full rounded-xl ${tall ? "h-[300px]" : "h-[220px]"}`} />
      <LoadingSkeleton className="h-24 w-full rounded-xl" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
    {Array.from({ length: 8 }).map((_, i) => (
      <AnalyticsCardSkeleton key={i} tall={i === 0 || i === 2 || i === 6 || i === 7} />
    ))}
  </div>
);

export default LoadingSkeleton;
