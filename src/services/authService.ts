import { apiClient } from './api';
import { apiCache } from '@/lib/cache';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  async logout(): Promise<void> {
    apiCache.clear();
    return apiClient.post<void>('/auth/logout').catch(() => {});
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken });
  },

  async getCurrentUser(forceRefresh = false): Promise<User> {
    return apiCache.fetchWithCache(
      'user_profile',
      () => apiClient.get<User>('/users/me'),
      10, // Cache profile for 10 minutes
      forceRefresh
    );
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const user = await apiClient.put<User>('/users/me', data);
    apiCache.invalidate('user_profile');
    return user;
  },
};
