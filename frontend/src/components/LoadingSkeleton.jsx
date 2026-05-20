const LoadingSkeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-2xl bg-white/[0.04] ${className}`}
    aria-hidden="true"
  />
);

export const StatCardSkeleton = () => (
  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md">
    <LoadingSkeleton className="mb-4 h-3 w-24" />
    <LoadingSkeleton className="mb-2 h-9 w-32" />
    <LoadingSkeleton className="h-3 w-20" />
  </div>
);

export const AnalyticsCardSkeleton = ({ tall = false }) => (
  <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 backdrop-blur-md">
    <LoadingSkeleton className="mb-3 h-4 w-28" />
    <LoadingSkeleton className="mb-6 h-7 w-2/3 max-w-sm" />
    <LoadingSkeleton className="mb-8 h-4 w-full max-w-md" />
    <LoadingSkeleton className={`w-full ${tall ? "h-[320px]" : "h-[220px]"}`} />
    <LoadingSkeleton className="mt-6 h-24 w-full" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <AnalyticsCardSkeleton key={i} tall={i < 2} />
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
