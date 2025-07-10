import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add Authorization token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to request header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
