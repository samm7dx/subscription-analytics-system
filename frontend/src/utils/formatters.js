export const formatCurrency = (value, currency = "USD") => {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatCompactNumber = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatNumber = (value, decimals = 0) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatDate = (value, options = {}) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  });
};

export const formatMonth = (value) => {
  if (!value) return "—";
  const [year, month] = String(value).split("-");
  if (!year || !month) return String(value);

  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

export const formatDuration = (minutes) => {
  const num = Number(minutes);
  if (Number.isNaN(num)) return "—";
  if (num < 60) return `${Math.round(num)}m`;
  const h = Math.floor(num / 60);
  const m = Math.round(num % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const truncateLabel = (text, max = 18) => {
  if (!text) return "";
  const str = String(text);
  return str.length > max ? `${str.slice(0, max)}…` : str;
};
