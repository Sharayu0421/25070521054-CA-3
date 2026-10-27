import axios from 'axios';

// Vite proxy handles /api -> http://localhost:5000 in dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request to attach auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('techcart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept response to standardize error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred. Please try again.',
    };
    return Promise.reject(customError);
  }
);

export default api;
