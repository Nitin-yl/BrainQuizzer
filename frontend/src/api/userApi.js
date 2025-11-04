// api/userApi.js
// Do NOT use React hooks here. Accept getToken from caller component.

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchUserStats = async (getToken, { timeoutMs = 10000 } = {}) => {
  const token = await getToken();

  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch user stats");
    }

    return response.json(); // includes user, stats, recent, badges
  } catch (e) {
    if (e.name === "AbortError") throw new Error("Request timed out. Please try again.");
    throw e;
  } finally {
    clearTimeout(to);
  }
};
