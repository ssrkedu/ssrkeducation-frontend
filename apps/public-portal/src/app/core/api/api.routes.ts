import { environment } from '../../../environments/environment';

export const API_ROUTES = {
  public: {
    sites: {
      resolve: '/api/public/sites/resolve',
    },
    institutions: {
      list: '/api/public/institutions',
    },
  },
} as const;

export function buildApiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}
