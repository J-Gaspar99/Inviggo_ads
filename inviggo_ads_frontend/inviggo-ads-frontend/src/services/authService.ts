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

class AuthService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      // Dekodiraj JWT token da dobiješ username
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      return payload.sub; // 'sub' je standardno polje za username u JWT
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    
    if (response.data.token) {
      this.setToken(response.data.token);
      localStorage.setItem('username', response.data.username);
    }
    
    return response.data;
  }

  logout() {
    this.removeToken();
    localStorage.removeItem('username');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token.trim()}`;
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
          this.removeToken();
          localStorage.removeItem('username');
        }
        return Promise.reject(error);
      }
    );
  }

  async register(userData: RegisterDTO): Promise<AuthResponse> {
    try {
      console.log('Sending registration request:', userData);
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        this.setToken(response.data.token);
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
}

export const authService = new AuthService();

authService.setupAxiosInterceptors(); 