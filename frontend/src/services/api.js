export const runQuery = async (endpoint) => {
  try {
   const BASE_URL = import.meta.env.VITE_API_URL;

export const runQuery = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return res.json();
};
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};
