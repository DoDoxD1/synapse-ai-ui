import { apiClient } from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken });
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/users/me');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.put<User>('/users/me', data);
  },
};
