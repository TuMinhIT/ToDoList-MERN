import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
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
  login: async (username, password) => {
    try {
      const response = await API.post("/login", { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const productAPI = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const response = await API.get("/products");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy sản phẩm theo ID
  getById: async (id) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Thêm sản phẩm mới
  create: async (productData) => {
    const formData = new FormData();
    formData.append("code", productData.code);
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("desc", productData.desc);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Cập nhật sản phẩm
  update: async (id, productData) => {
    const formData = new FormData();
    formData.append("code", productData.code);
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("desc", productData.desc);

    if (productData.image && typeof productData.image === "object") {
      formData.append("image", productData.image);
    }

    const response = await API.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Xóa sản phẩm
  delete: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  },
};

export default API;
