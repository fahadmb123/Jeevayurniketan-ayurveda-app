import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

const STORAGE_KEY = 'jeeva_auth_user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulating API network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockUser: User = {
      id: 'usr_doc_01',
      name: credentials.email.includes('doctor') ? 'Dr. Manoj Kumar' : 'Guest Patient',
      email: credentials.email,
      role: credentials.email.includes('doctor') ? 'doctor' : 'patient',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockUser: User = {
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role || 'patient',
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return response;
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};
