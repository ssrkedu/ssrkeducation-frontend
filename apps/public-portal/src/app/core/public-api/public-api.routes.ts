import { environment } from '../../../environments/environment';

export const PUBLIC_API_ROUTES = {
  sites: {
    resolve: '/api/public/sites/resolve',
    page: (tenantKey: string, pageKey: string) =>
      `/api/public/sites/${tenantKey}/pages/${pageKey}`,
    institutions: (tenantKey: string) =>
      `/api/public/sites/${tenantKey}/institutions`,
    courses: (tenantKey: string) => `/api/public/sites/${tenantKey}/courses`,
    scholarships: (tenantKey: string) =>
      `/api/public/sites/${tenantKey}/scholarships`,
  },
  enquiries: {
    interestTopics: '/api/public/enquiry-interest-topics',
    submit: '/api/public/enquiries',
  },
} as const;

export function buildPublicApiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}

/** Maps the browser hostname to a host stored in site_domains for resolve API. */
export function getResolveHost(hostname: string): string {
  const host = hostname.toLowerCase();

  if (environment.publicSite.mainHosts.includes(host)) {
    return 'ssrkedu.in';
  }

  // local: ssrkdc.lvh.me → ssrkdc.ssrkedu.in (seeded domain in DB)
  if (environment.name === 'local' && host.endsWith('.lvh.me')) {
    const subdomain = host.split('.')[0];

    if (subdomain === 'ssrkeducation') {
      return 'ssrkedu.in';
    }

    return `${subdomain}.ssrkedu.in`;
  }

  // dev custom domain: ssrkdc.dev.ssrkedu.in → ssrkdc.ssrkedu.in
  if (environment.name === 'dev' && host.endsWith('.dev.ssrkedu.in')) {
    const subdomain = host.slice(0, -'.dev.ssrkedu.in'.length).split('.')[0];
    return subdomain ? `${subdomain}.ssrkedu.in` : 'ssrkedu.in';
  }

  return host;
}
