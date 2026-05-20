import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import ChartWrapper from "./ChartWrapper";
import KPIPanel from "./KPIPanel";
import LeaderboardTable from "./LeaderboardTable";
import EmptyState from "./EmptyState";

import {
  formatCurrency,
  formatDate,
  formatMonth,
  formatNumber,
  formatDuration,
  truncateLabel,
} from "../utils/formatters";
import { CHART_COLORS, tooltipStyle, axisTick, gridStroke } from "../utils/chartTheme";

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={tooltipStyle}>
      {label && <p className="mb-1.5 text-xs text-gray-400">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {formatter ? formatter(entry.value, entry.name) : entry.value}
        </p>
      ))}
    </div>
  );
};

const ChartPanel = ({ chartType, data, title }) => {
  if (!data?.length && chartType !== "kpi") {
    return <EmptyState title="No chart data" message={`${title || "This metric"} has no rows to visualize.`} />;
  }

  switch (chartType) {
    case "kpi":
      return <KPIPanel data={data} />;

    case "leaderboard":
      return <LeaderboardTable data={data} />;

    case "line": {
      const chartData = [...data]
        .map((item) => ({
          ...item,
          label: formatDate(item.activity_date, { month: "short", day: "numeric" }),
        }))
        .reverse();

      return (
        <ChartWrapper height={300} ariaLabel="Daily active users line chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 12, right: 16, left: 4, bottom: 8 }}>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={28}
              />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} width={42} />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(v) => formatNumber(v)}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="total_active_users"
                name="Active Users"
                stroke={CHART_COLORS[0]}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: CHART_COLORS[0], stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      );
    }

    case "area": {
      const chartData = data.map((item) => ({
        ...item,
        label: formatMonth(item.month),
      }));

      return (
        <ChartWrapper height={300} ariaLabel="Monthly revenue area chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={false} />
              <YAxis
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v) => formatCurrency(v)}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(v, name) =>
                      name === "Monthly Revenue"
                        ? formatCurrency(v)
                        : formatNumber(v)
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="monthly_revenue"
                name="Monthly Revenue"
                stroke={CHART_COLORS[0]}
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      );
    }

    case "bar": {
      const isEngagement = data[0]?.average_watch_time !== undefined;
      const chartData = data.map((item) => ({
        ...item,
        label: truncateLabel(item.title || item.name, 14),
        metric: isEngagement
          ? Number(item.average_watch_time) || 0
          : Number(item.total_views) || 0,
      }));

      const dataKey = isEngagement ? "metric" : "total_views";
      const name = isEngagement ? "Avg Watch Time (min)" : "Views";

      return (
        <ChartWrapper height={isEngagement ? 380 : 320} ariaLabel="Bar chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout={isEngagement ? "vertical" : "horizontal"}
              margin={
                isEngagement
                  ? { top: 8, right: 20, left: 8, bottom: 8 }
                  : { top: 12, right: 16, left: 4, bottom: 56 }
              }
            >
              <CartesianGrid stroke={gridStroke} horizontal={!isEngagement} vertical={isEngagement} />
              {isEngagement ? (
                <>
                  <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} tickFormatter={(v) => formatDuration(v)} />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={axisTick}
                    tickLine={false}
                    axisLine={false}
                    width={72}
                    tickFormatter={(v) => truncateLabel(v, 12)}
                  />
                  <Tooltip content={<CustomTooltip formatter={(v) => formatDuration(v)} />} />
                  <Bar dataKey={dataKey} name={name} fill={CHART_COLORS[0]} radius={[0, 6, 6, 0]} maxBarSize={14} />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="label"
                    tick={axisTick}
                    tickLine={false}
                    axisLine={false}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    tickMargin={8}
                  />
                  <YAxis tick={axisTick} tickLine={false} axisLine={false} width={42} />
                  <Tooltip content={<CustomTooltip formatter={(v) => formatNumber(v)} />} />
                  <Bar dataKey="total_views" name="Views" fill={CHART_COLORS[0]} radius={[6, 6, 0, 0]} maxBarSize={36} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      );
    }

    case "pie":
    case "doughnut": {
      const isDoughnut = chartType === "doughnut";
      const chartData = data.map((item, i) => ({
        name: item.genre || item.status,
        value: Number(item.total_views ?? item.number_of_users) || 0,
        fill: CHART_COLORS[i % CHART_COLORS.length],
      }));

      return (
        <ChartWrapper height={isDoughnut ? 340 : 320} ariaLabel={isDoughnut ? "Genre doughnut chart" : "Churn pie chart"}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={isDoughnut ? 60 : 0}
                outerRadius={isDoughnut ? 88 : 92}
                paddingAngle={isDoughnut ? 3 : 2}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatter={(v) => formatNumber(v)} />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs text-gray-400">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      );
    }

    default:
      return (
        <EmptyState
          title="Unsupported chart"
          message={`Chart type "${chartType}" is not configured.`}
        />
      );
  }
};

export default ChartPanel;
