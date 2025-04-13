import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'user' | 'admin' | 'super_admin';
    verification_status: 'unverified' | 'verified' | 'suspended';
    created_at: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log('Sending login request with credentials:', credentials);
      const response = await this.api.post<LoginResponse>('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Trop de tentatives de connexion. Veuillez patienter quelques minutes avant de réessayer.');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // On supprime quand même les données locales même en cas d'erreur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin' || user?.role === 'super_admin';
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.api.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.api.post('/auth/reset-password', { token, newPassword });
  }
}

export const authService = new AuthService(); 