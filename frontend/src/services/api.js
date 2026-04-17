export const runQuery = async (endpoint) => {
  try {
    const res = await fetch(`http://localhost:5000${endpoint}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};
