export const environment = {
  apiBaseUrl: import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || ''),
};
