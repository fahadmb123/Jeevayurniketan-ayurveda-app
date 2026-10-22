import type { AuthResponse, User } from '../types';

const AUTH_STORAGE_KEY = 'jeeva_auth_session';

export const authStorage = {
  get(): AuthResponse | null {
    try {
      const value = localStorage.getItem(AUTH_STORAGE_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  save(session: AuthResponse): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  },
  clear(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
  user(): User | null {
    return this.get()?.user ?? null;
  },
};
