import axios from "axios";
import Cookies from "js-cookie";

// Ensure baseURL includes /api prefix if not already included
const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  // If URL doesn't end with /api, add it
  return url.endsWith("/api") ? url : `${url}/api`;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

// Request: Add token from cookies
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: Handle 401, network errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      if (typeof window !== "undefined") window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
