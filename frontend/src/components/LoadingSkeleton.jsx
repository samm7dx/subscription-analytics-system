const LoadingSkeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-xl bg-white/[0.04] ${className}`}
    aria-hidden="true"
  />
);

export const StatCardSkeleton = () => (
  <div className="min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 md:p-6">
    <LoadingSkeleton className="mb-3 h-3 w-24" />
    <LoadingSkeleton className="mb-2 h-8 w-28 sm:h-9 sm:w-32" />
    <LoadingSkeleton className="h-3 w-20" />
  </div>
);

export const AnalyticsCardSkeleton = ({ tall = false }) => (
  <div className="min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6 md:rounded-3xl md:p-8">
    <LoadingSkeleton className="mb-3 h-4 w-28" />
    <LoadingSkeleton className="mb-4 h-6 w-4/5 max-w-sm sm:mb-6 sm:h-7" />
    <LoadingSkeleton className="mb-6 h-4 w-full max-w-md" />
    <LoadingSkeleton className={`w-full ${tall ? "h-[280px] sm:h-[320px]" : "h-[200px] sm:h-[220px]"}`} />
    <LoadingSkeleton className="mt-5 h-20 w-full sm:mt-6 sm:h-24" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="min-w-0 space-y-6 sm:space-y-8">
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7">
      {Array.from({ length: 6 }).map((_, i) => (
        <AnalyticsCardSkeleton key={i} tall={i < 2} />
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
