import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(identifier: string, password: string) {
    try {
      const response = await this.instance.post('/auth/login', { identifier, password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(username: string, email: string, password: string) {
    try {
      const response = await this.instance.post('/auth/register', { username, email, password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await this.instance.post('/auth/logout');
      localStorage.removeItem('token');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.instance.get('/auth/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { error: 'No response received from server' };
      }
    }
    return { error: 'An unexpected error occurred' };
  }
}

export const api = new ApiService();