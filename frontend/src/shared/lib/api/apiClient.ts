import { environment } from '@/shared/config/environment';
import { ApiError } from './ApiError';

export const apiClient = {
  async post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    let response: Response;
    try {
      response = await fetch(`${environment.apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
      });
    } catch {
      throw new ApiError(0, 'Unable to connect to the API service');
    }

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new ApiError(response.status, payload?.error?.message || 'Request failed', payload?.error);
    }

    return payload as TResponse;
  },

  async get<TResponse>(path: string): Promise<TResponse> {
    let response: Response;
    try {
      response = await fetch(`${environment.apiBaseUrl}${path}`, { credentials: 'include' });
    } catch {
      throw new ApiError(0, 'Unable to connect to the API service');
    }
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(response.status, payload?.error?.message || 'Request failed', payload?.error);
    return payload as TResponse;
  },
};
