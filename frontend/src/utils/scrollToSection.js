const HIGHLIGHT_CLASS = "section-highlight";

export const scrollToSection = (elementId, options = {}) => {
  const { block = "center", highlight = true, duration = 2200 } = options;
  const el = document.getElementById(elementId);

  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block });

  if (highlight) {
    el.classList.add(HIGHLIGHT_CLASS);
    window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), duration);
  }

  return true;
};

export const scrollToAnalyticsChart = (key) =>
  scrollToSection(`analytics-${key}`);

export const scrollToAnalyticsQuery = (key) =>
  scrollToSection(`query-${key}`, { block: "start" });
