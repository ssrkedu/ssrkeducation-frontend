import { environment } from '../../../environments/environment';

export function buildTenantSiteUrl(subdomain: string): string {
  const config = environment.publicSite;
  const port = config.port ? `:${config.port}` : '';

  return `${config.protocol}://${subdomain}.${config.apexDomain}${port}`;
}

/** Institution card links always use the current environment's public-site URL. */
export function resolveInstitutionSiteUrl(subdomain: string): string {
  return buildTenantSiteUrl(subdomain);
}

export function buildTrustSiteUrl(): string {
  const config = environment.publicSite;
  const port = config.port ? `:${config.port}` : '';
  const trustHost = config.mainHosts.find((host) => host !== 'localhost') ?? config.mainHosts[0];

  return `${config.protocol}://${trustHost}${port}`;
}

export function buildTrustEnquiryUrl(tenantKey: string | undefined): string | null {
  if (!tenantKey) {
    return null;
  }

  return `${buildTrustSiteUrl()}/?institution=${encodeURIComponent(tenantKey)}#enquiry`;
}

export function formatTenantSiteHost(subdomain: string): string {
  const config = environment.publicSite;
  const port = config.port ? `:${config.port}` : '';

  return `${subdomain}.${config.apexDomain}${port}`;
}
