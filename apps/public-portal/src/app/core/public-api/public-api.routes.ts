import { environment } from '../../../environments/environment';

export const PUBLIC_API_ROUTES = {
  sites: {
    resolve: '/api/public/sites/resolve',
    page: (tenantKey: string, pageKey: string) =>
      `/api/public/sites/${tenantKey}/pages/${pageKey}`,
    institutions: (tenantKey: string) =>
      `/api/public/sites/${tenantKey}/institutions`,
  },
  enquiries: {
    interestTopics: '/api/public/enquiry-interest-topics',
    submit: '/api/public/enquiries',
  },
} as const;

export function buildPublicApiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}

/** Local dev hosts are not in DB — resolve against the seeded primary domain. */
export function getResolveHost(hostname: string): string {
  const host = hostname.toLowerCase();

  if (environment.publicSite.mainHosts.includes(host)) {
    return 'ssrkedu.in';
  }

  return host;
}
