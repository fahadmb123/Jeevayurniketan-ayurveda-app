import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { AUTH_QUERY_KEY } from './useAuthMutation';
import type { RegisterData } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: AUTH_QUERY_KEY, queryFn: async () => authService.getCurrentUser() });

  return {
    user,
    isAuthenticated: !!user,
    loading: false,
    error: null,
    register: async (data: RegisterData) => (await authService.register(data)).user,
    logout: async () => { await authService.logout(); queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY }); },
  };
};
