// src/api/axios.ts
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants/urls";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/refresh-token/`, { refresh: refreshToken });

          Cookies.set("access", data.access, { expires: 1 });
          Cookies.set("refresh", data.refresh, { expires: 7 });

          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch {
          Cookies.remove("access");
          Cookies.remove("refresh");
          Cookies.remove("user");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
