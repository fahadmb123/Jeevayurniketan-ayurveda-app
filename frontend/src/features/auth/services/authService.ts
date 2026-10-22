import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types';
import { apiClient } from '@/shared/lib/api/apiClient';
import { authStorage } from './authStorage';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse, LoginCredentials>('/api/doctor/login', credentials);
    authStorage.save(response);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    throw new Error(`Registration is not available for ${data.email}`);
  },

  async logout(): Promise<void> {
    authStorage.clear();
  },

  getCurrentUser(): User | null {
    return authStorage.user();
  },
};
