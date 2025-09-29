import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor để tự động thêm token vào header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 408) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: async ({ email, password }) => {
    try {
      const response = await API.post("/api/auth/login", {
        username: email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async ({ email, password }) => {
    try {
      const response = await API.post("/api/auth/register", {
        username: email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const taskAPI = {
  getAll: async () => {
    try {
      const response = await API.get("/api/tasks");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy sản phẩm theo ID
  getById: async (id) => {
    try {
      const response = await API.get(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async ({ title, desc, category }) => {
    try {
      const response = await API.post("/api/tasks", {
        title,
        desc,
        category,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async ({ id, title, desc, completed }) => {
    try {
      const response = await API.put(`/api/tasks/${id}`, {
        title,
        desc,
        completed,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async ({ id }) => {
    try {
      const response = await API.delete(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default API;
