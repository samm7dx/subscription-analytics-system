import StatCard from "./StatCard";
import { formatCurrency, formatNumber } from "../utils/formatters";

const DashboardOverview = ({ analytics, loading }) => {
  if (loading) return null;

  const revenue = analytics?.revenue?.data?.[0]?.total_revenue_generated ?? 0;

  const dauRows = analytics?.dau?.data ?? [];
  const latestDau = dauRows[0]?.total_active_users ?? 0;

  const churnRows = analytics?.churn?.data ?? [];
  const activeSubs = churnRows.find((r) => r.status === "active")?.number_of_users ?? 0;

  const engagementRows = analytics?.engagement?.data ?? [];
  const avgEngagement =
    engagementRows.length > 0
      ? engagementRows.reduce(
          (sum, row) => sum + (Number(row.average_watch_time) || 0),
          0
        ) / engagementRows.length
      : 0;

  const icons = {
    revenue: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    users: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    subs: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    engagement: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={revenue}
        subtext="From active subscriptions"
        icon={icons.revenue}
        delay={0}
        formatValue={(v) => formatCurrency(v)}
      />
      <StatCard
        label="Daily Active Users"
        value={latestDau}
        subtext="Latest recorded day"
        icon={icons.users}
        delay={0.05}
        formatValue={(v) => formatNumber(v)}
      />
      <StatCard
        label="Active Subscriptions"
        value={activeSubs}
        subtext="Currently active plans"
        icon={icons.subs}
        delay={0.1}
        formatValue={(v) => formatNumber(v)}
      />
      <StatCard
        label="Avg Engagement"
        value={avgEngagement}
        subtext="Mean watch time (minutes)"
        icon={icons.engagement}
        delay={0.15}
        formatValue={(v) => `${formatNumber(v, 1)} min`}
      />
    </div>
  );
};

export default DashboardOverview;
