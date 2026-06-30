import { environment } from '../../../environments/environment';

export function buildTenantSiteUrl(subdomain: string): string {
  const config = environment.publicSite;
  const port = config.port ? `:${config.port}` : '';

  return `${config.protocol}://${subdomain}.${config.apexDomain}${port}`;
}

export function formatTenantSiteHost(subdomain: string): string {
  const config = environment.publicSite;
  const port = config.port ? `:${config.port}` : '';

  return `${subdomain}.${config.apexDomain}${port}`;
}
