import { environment } from '../../../environments/environment';

export function resolveTenantKeyFromHost(hostname: string): string {
  const host = hostname.toLowerCase();

  if (environment.publicSite.mainHosts.includes(host)) {
    return 'trust';
  }

  return host.split('.')[0] || 'trust';
}

export function isMainSiteHost(hostname: string): boolean {
  return resolveTenantKeyFromHost(hostname) === 'trust';
}
