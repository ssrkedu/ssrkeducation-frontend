import { environment } from '../../../environments/environment';

export const API_ROUTES = {
  admin: {
    auth: {
      login: '/api/admin/auth/login',
      refresh: '/api/admin/auth/refresh',
      logout: '/api/admin/auth/logout',
      me: '/api/admin/auth/me',
    },
  },
} as const;

export function buildApiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}
