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
    <div className="min-h-screen overflow-x-hidden bg-[#050508] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.06)_0%,_transparent_50%)]" />

      <Navbar />
      <Hero />
      <AnalyticsKnowledgeCenter />

      <main className="relative mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <section id="overview" className="scroll-mt-28 py-14 md:py-20">
          <SectionTitle
            eyebrow={PROJECT_NAME}
            title="Summary Metrics"
            description="Aggregated values from subscription, user activity, and engagement tables."
          />
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[128px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
                />
              ))}
            </div>
          ) : error ? (
            <EmptyState title="Connection error" message={error} />
          ) : (
            <DashboardOverview analytics={analytics} loading={loading} />
          )}
        </section>

        <section id="analytics" className="scroll-mt-28 py-14 md:py-20">
          <SectionTitle
            eyebrow="Data Visualization"
            title={PROJECT_NAME}
            description={DASHBOARD_DESCRIPTION}
          />

          {loading ? (
            <DashboardSkeleton />
          ) : error ? null : (
            <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-2 lg:gap-8">
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
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.05] bg-black/25 p-3 md:p-5">
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

        <section id="insights" className="scroll-mt-28 pb-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.06] bg-white/[0.02] px-6 py-10 text-center backdrop-blur-md md:px-12 md:py-14">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              SQL Query Reference
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
              Each chart is generated from a MySQL query. Use the Metric Reference
              section for definitions, then inspect and copy queries below each chart.
            </p>
            {!loading && (
              <button
                type="button"
                onClick={loadAnalytics}
                className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:text-white"
              >
                Reload data
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.05] py-10">
        <p className="text-center text-xs text-gray-600">{FOOTER_TEXT}</p>
      </footer>
    </div>
  );
};

export default Dashboard;
