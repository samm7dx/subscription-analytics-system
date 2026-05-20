import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AnalyticsKnowledgeCenter from "../components/AnalyticsKnowledgeCenter";
import SectionTitle from "../components/SectionTitle";
import DashboardOverview from "../components/DashboardOverview";
import AnalyticsCard from "../components/AnalyticsCard";
import QueryViewer from "../components/QueryViewer";
import ChartPanel from "../components/ChartPanel";
import { DashboardSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";

import { fetchAllAnalytics } from "../services/api";
import {
  PROJECT_NAME,
  DASHBOARD_DESCRIPTION,
  FOOTER_TEXT,
} from "../constants/branding";

const ANALYTICS_LAYOUT = [
  { key: "dau", span: "full" },
  { key: "revenue", span: "default" },
  { key: "monthlyRevenue", span: "full" },
  { key: "churn", span: "default" },
  { key: "genreEngagement", span: "default" },
  { key: "topContent", span: "default" },
  { key: "engagement", span: "full" },
  { key: "activeUsers", span: "full" },
];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
      setError(
        "Could not connect to the API. Start the backend server and verify the database connection."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050508] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.06)_0%,_transparent_50%)]" />

      <Navbar />
      <Hero />
      <AnalyticsKnowledgeCenter />

      <main className="page-container relative w-full pb-20 md:pb-28">
        <section id="overview" className="section-block border-t border-white/[0.04]">
          <SectionTitle
            eyebrow={PROJECT_NAME}
            title="Summary Metrics"
            description="Aggregated values from subscription, user activity, and engagement tables."
          />
          {loading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[120px] min-w-0 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03] sm:h-[128px]"
                />
              ))}
            </div>
          ) : error ? (
            <EmptyState title="Connection error" message={error} />
          ) : (
            <DashboardOverview analytics={analytics} loading={loading} />
          )}
        </section>

        <section id="analytics" className="section-block border-t border-white/[0.04]">
          <SectionTitle
            eyebrow="Data Visualization"
            title={PROJECT_NAME}
            description={DASHBOARD_DESCRIPTION}
          />

          {loading ? (
            <DashboardSkeleton />
          ) : error ? null : (
            <div className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7">
              {ANALYTICS_LAYOUT.map(({ key, span }, index) => {
                const payload = analytics?.[key];

                if (!payload || payload.error) {
                  return (
                    <AnalyticsCard
                      key={key}
                      id={`analytics-${key}`}
                      title={key}
                      description="This query could not be loaded from the API."
                      delay={index * 0.05}
                      span={span}
                    >
                      <EmptyState
                        title="Load failed"
                        message="Check the backend server and MySQL database."
                      />
                    </AnalyticsCard>
                  );
                }

                return (
                  <AnalyticsCard
                    key={key}
                    id={`analytics-${key}`}
                    title={payload.title}
                    description={payload.description}
                    chartType={payload.chartType}
                    generatedFrom={payload.generatedFrom}
                    span={span}
                    delay={index * 0.05}
                  >
                    <div className="card-inner rounded-xl border border-white/[0.05] bg-black/25 p-3 sm:rounded-2xl sm:p-4 md:p-5">
                      <ChartPanel
                        chartType={payload.chartType}
                        data={payload.data}
                        title={payload.title}
                      />
                    </div>
                    <QueryViewer id={`query-${key}`} query={payload.query} />
                  </AnalyticsCard>
                );
              })}
            </div>
          )}
        </section>

        <section id="insights" className="section-block border-t border-white/[0.04]">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-8 text-center backdrop-blur-md sm:rounded-3xl sm:px-8 sm:py-10 md:px-10 md:py-12">
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              SQL Query Reference
            </h3>
            <p className="mx-auto mt-3 max-w-md break-words text-sm leading-relaxed text-gray-400 sm:mt-4 md:text-base">
              Each chart is generated from a MySQL query. Use the Metric Reference
              section for definitions, then inspect and copy queries below each chart.
            </p>
            {!loading && (
              <button
                type="button"
                onClick={loadAnalytics}
                className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:text-white sm:mt-8"
              >
                Reload data
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.05] py-8 md:py-10">
        <p className="page-container text-center text-xs leading-relaxed text-gray-600">
          {FOOTER_TEXT}
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
