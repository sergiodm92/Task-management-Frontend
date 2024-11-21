import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Axios interceptors
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Error en la configuración de la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor for handling HTTP errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError | any) => {
    // Global error handler
    const status = error.response?.status;
    if (status === 401) {
      Cookies.remove('token');
      window.history.pushState({}, '', '/login');
    }
    return Promise.reject({
      message: error.response?.data?.message || error.message,
      status: status || 'Network Error',
    });
  }
);

export default axiosInstance;
