import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
}

interface RegisterDTO {
  username: string;
  password: string;
  phoneNumber: string;
}

interface AuthResponse {
  token: string;
  username: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  getCurrentUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      return {
        username: username,
        token: token
      };
    }
    return null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUsername: () => {
    return localStorage.getItem('username');
  },

  setupAxiosInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  },

  async register(userData: RegisterDTO): Promise<AuthResponse> {
    try {
      console.log('Sending registration request:', userData);
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
      }
      throw error;
    }
  }
};

authService.setupAxiosInterceptors(); 