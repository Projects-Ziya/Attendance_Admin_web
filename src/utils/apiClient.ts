// src/utils/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 5000,
});

// Global response handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn("🚨 Backend not reachable. Please check the server.");
    } else {
      console.warn(`⚠ API Error: ${error.response.status} ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
