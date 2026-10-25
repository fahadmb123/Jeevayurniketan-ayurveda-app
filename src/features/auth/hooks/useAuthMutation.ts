import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types';

export const AUTH_QUERY_KEY = ['auth', 'session'] as const;

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (user) => queryClient.setQueryData(AUTH_QUERY_KEY, user),
  });
};
