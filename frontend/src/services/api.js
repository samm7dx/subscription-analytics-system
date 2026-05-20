import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/analytics",
  timeout: 20000,
  headers: { Accept: "application/json" },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("CORS error: verify FRONTEND_URL on the backend matches this site.");
    }
    return Promise.reject(error);
  }
);

export const analyticsEndpoints = {
  dau: "/dau",
  revenue: "/revenue",
  topContent: "/top-content",
  churn: "/churn",
  engagement: "/engagement",
  monthlyRevenue: "/monthly-revenue",
  activeUsers: "/active-users",
  genreEngagement: "/genre-engagement",
};

export const fetchAnalytics = async (endpoint) => {
  const { data } = await API.get(endpoint);
  return data;
};

export const fetchAllAnalytics = async () => {
  const entries = Object.entries(analyticsEndpoints);

  const results = await Promise.allSettled(
    entries.map(([, path]) => API.get(path))
  );

  const payload = {};
  entries.forEach(([key], index) => {
    const result = results[index];
    payload[key] =
      result.status === "fulfilled" ? result.value.data : { error: true };
  });

  return payload;
};

export default API;
