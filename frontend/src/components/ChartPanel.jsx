import { useId } from "react";
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
import {
  CHART_COLORS,
  PRIMARY_STROKE,
  PRIMARY_FILL,
  tooltipStyle,
  axisTick,
  axisLine,
  gridStroke,
  chartMargins,
  legendStyle,
} from "../utils/chartTheme";

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={tooltipStyle}>
      {label != null && label !== "" && (
        <p style={{ marginBottom: 6, fontSize: 11, color: "#9ca3af" }}>{label}</p>
      )}
      {payload.map((entry) => (
        <p
          key={`${entry.dataKey}-${entry.name}`}
          style={{ fontSize: 13, fontWeight: 500, color: entry.color || "#f3f4f6" }}
        >
          {entry.name}: {formatter ? formatter(entry.value, entry.name) : entry.value}
        </p>
      ))}
    </div>
  );
};

const ChartPanel = ({ chartType, data, title }) => {
  const gradientId = useId().replace(/:/g, "");

  if (!data?.length && chartType !== "kpi") {
    return (
      <EmptyState
        title="No chart data"
        message={`${title || "This metric"} has no rows to visualize.`}
      />
    );
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
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <LineChart data={chartData} margin={chartMargins.line}>
              <CartesianGrid stroke={gridStroke} strokeOpacity={1} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisTick}
                axisLine={axisLine}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tick={axisTick}
                axisLine={axisLine}
                tickLine={false}
                width={48}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip formatter={(v) => formatNumber(v)} />} />
              <Line
                type="monotone"
                dataKey="total_active_users"
                name="Active Users"
                stroke={PRIMARY_STROKE}
                strokeWidth={3}
                fill="none"
                dot={{ r: 3, fill: PRIMARY_STROKE, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: PRIMARY_STROKE, stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive={false}
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
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <AreaChart data={chartData} margin={chartMargins.area}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRIMARY_FILL} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={PRIMARY_FILL} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridStroke} strokeOpacity={1} vertical={false} />
              <XAxis dataKey="label" tick={axisTick} axisLine={axisLine} tickLine={false} />
              <YAxis
                tick={axisTick}
                axisLine={axisLine}
                tickLine={false}
                width={56}
                tickFormatter={(v) => formatCurrency(v)}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(v, name) =>
                      name === "Monthly Revenue" ? formatCurrency(v) : formatNumber(v)
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="monthly_revenue"
                name="Monthly Revenue"
                stroke={PRIMARY_STROKE}
                fill={`url(#${gradientId})`}
                strokeWidth={2.5}
                isAnimationActive={false}
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
        metric: Number(item.average_watch_time) || 0,
      }));

      return (
        <ChartWrapper height={isEngagement ? 400 : 340} ariaLabel="Bar chart">
          <ResponsiveContainer width="100%" height="100%" minHeight={isEngagement ? 360 : 300}>
            <BarChart
              data={chartData}
              layout={isEngagement ? "vertical" : "horizontal"}
              margin={isEngagement ? chartMargins.barVertical : chartMargins.barHorizontal}
            >
              <CartesianGrid
                stroke={gridStroke}
                strokeOpacity={1}
                horizontal={!isEngagement}
                vertical={isEngagement}
              />
              {isEngagement ? (
                <>
                  <XAxis
                    type="number"
                    tick={axisTick}
                    axisLine={axisLine}
                    tickLine={false}
                    tickFormatter={(v) => formatDuration(v)}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={axisTick}
                    axisLine={axisLine}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip formatter={(v) => formatDuration(v)} />} />
                  <Bar
                    dataKey="metric"
                    name="Avg Watch Time"
                    fill={PRIMARY_FILL}
                    stroke={PRIMARY_STROKE}
                    strokeWidth={1}
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                    isAnimationActive={false}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="label"
                    tick={axisTick}
                    axisLine={axisLine}
                    tickLine={false}
                    angle={-28}
                    textAnchor="end"
                    height={64}
                    interval={0}
                    tickMargin={10}
                  />
                  <YAxis
                    tick={axisTick}
                    axisLine={axisLine}
                    tickLine={false}
                    width={48}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip formatter={(v) => formatNumber(v)} />} />
                  <Bar
                    dataKey="total_views"
                    name="Views"
                    fill={PRIMARY_FILL}
                    stroke={PRIMARY_STROKE}
                    strokeWidth={1}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                    isAnimationActive={false}
                  />
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
        <ChartWrapper height={360} ariaLabel={isDoughnut ? "Genre doughnut chart" : "Churn pie chart"}>
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <PieChart margin={chartMargins.pie}>
              <Pie
                data={chartData}
                cx="50%"
                cy="42%"
                innerRadius={isDoughnut ? 58 : 0}
                outerRadius={isDoughnut ? 86 : 90}
                paddingAngle={isDoughnut ? 2 : 1}
                dataKey="value"
                nameKey="name"
                stroke="#0f0f14"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatter={(v) => formatNumber(v)} />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={legendStyle.wrapperStyle}
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
