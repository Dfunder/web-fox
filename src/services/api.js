import axios from 'axios';

// Create configured Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage directly to avoid circular dependency
    const state = window.__REDUX_STORE__?.getState?.();
    const token = state?.auth?.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - logout user
    if (error.response?.status === 401) {
      // Dispatch clearCredentials through global store reference
      window.__REDUX_STORE__?.dispatch({ type: 'auth/clearCredentials' });
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    
    // Handle validation errors (422, 400)
    if (error.response?.status === 422 || error.response?.status === 400) {
      const errorData = error.response.data;
      
      // Extract error messages from various possible formats
      if (errorData.errors) {
        // Laravel-style validation errors
        error.validationErrors = Object.values(errorData.errors).flat();
      } else if (errorData.message) {
        // Single error message
        error.validationErrors = [errorData.message];
      } else if (typeof errorData === 'string') {
        // Plain string error
        error.validationErrors = [errorData];
      } else {
        // Fallback to default error message
        error.validationErrors = ['Validation failed'];
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
