import { PUBLIC_API_ROUTES, buildPublicApiUrl } from '../public-api/public-api.routes';

/** @deprecated Use PUBLIC_API_ROUTES and buildPublicApiUrl instead. */
export const API_ROUTES = {
  public: {
    sites: {
      resolve: PUBLIC_API_ROUTES.sites.resolve,
    },
    institutions: {
      list: (tenantKey: string) => PUBLIC_API_ROUTES.sites.institutions(tenantKey),
    },
  },
} as const;

/** @deprecated Use buildPublicApiUrl instead. */
export function buildApiUrl(path: string): string {
  return buildPublicApiUrl(path);
}
