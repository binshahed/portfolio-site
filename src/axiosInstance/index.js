// src/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://portfolio-site-server-phi.vercel.app/api", // Replace with your API base URL
  timeout: 10000, // Set a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json" // Set default headers
    // Add other headers if needed
  }
});

// Optionally, you can set up interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
