function getBaseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  // Default to same-origin so:
  // - in dev: Vite proxy forwards /api to backend
  // - in prod: backend can serve frontend and API on same host
  if (!raw) return "";

  const trimmed = raw.replace(/\/$/, "");
  // If someone sets VITE_API_URL=http://host/api, normalize it.
  return trimmed.endsWith("/api") ? trimmed.slice(0, -4) : trimmed;
}

export async function apiGet(path) {
  const base = getBaseUrl();
  const res = await fetch(`${base}${path}`);
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      body?.error?.message || body?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}

// Backward compatible with the existing UI/config shape
export async function runQuery(endpoint) {
  try {
    return await apiGet(endpoint);
  } catch (e) {
    console.error(e);
    return [];
  }
}
