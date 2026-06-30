import { environment } from '../../../environments/environment';

export const API_ROUTES = {
  public: {
    sites: {
      resolve: '/api/public/sites/resolve',
    },
  },
} as const;

export function buildApiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}
