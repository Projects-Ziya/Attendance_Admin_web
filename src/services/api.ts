import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
  withCredentials: true,   // IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // 👈 stored after login

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 👈 required format
  }

  return config;
});

export default api;
