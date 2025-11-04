const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiCall = async (endpoint, options = {}, getToken) => {
  try {
    const token = await getToken();
    
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const quizApi = {
  getAll: async (getToken, filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiCall(`/quizzes?${queryParams}`, {}, getToken);
  },

  getById: async (getToken, id) => {
    return apiCall(`/quizzes/${id}`, {}, getToken);
  },

  submit: async (getToken, id, data) => {
    return apiCall(`/quizzes/${id}/submit`, {
      method: "POST",
      body: JSON.stringify(data),
    }, getToken);
  },

  create: async (getToken, quizData) => {
    return apiCall("/quizzes", {
      method: "POST",
      body: JSON.stringify(quizData),
    }, getToken);
  },

  categories: async (getToken) => {
    return apiCall("/categories", {}, getToken);
  },
};

export const userApi = {
  sync: async (getToken) => {
    return apiCall("/users/sync", {
      method: "POST",
    }, getToken);
  },

  getStats: async (getToken) => {
    return apiCall("/users/stats", {}, getToken);
  },
};

export const leaderboardApi = {
  get: async (getToken, limit = 50) => {
    return apiCall(`/leaderboard?limit=${limit}`, {}, getToken);
  },

  getUserStats: async (getToken, clerkId) => {
    return apiCall(`/leaderboard/user/${clerkId}`, {}, getToken);
  },
};

export default {
  quizApi,
  userApi,
  leaderboardApi,
};
