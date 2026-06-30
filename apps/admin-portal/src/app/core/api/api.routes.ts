export const API_ROUTES = {
  admin: {
    auth: {
      login: '/api/admin/auth/login',
      refresh: '/api/admin/auth/refresh',
      logout: '/api/admin/auth/logout',
    },
  },
} as const;

export function buildApiUrl(path: string): string {
  return path;
}
