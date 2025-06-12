import axios from 'axios';
import { authService } from './authService';

// Dodaj interceptor za requeste
axios.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Dodaj interceptor za response
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
); 