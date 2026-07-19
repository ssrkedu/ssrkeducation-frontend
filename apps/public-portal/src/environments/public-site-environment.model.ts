export interface PublicSiteEnvironmentConfig {
  protocol: 'http' | 'https';
  apexDomain: string;
  port: number | null;
  mainHosts: string[];
  /** Absolute URL for the Admin Portal header/mobile nav link. */
  adminPortalUrl: string;
}

export interface AppEnvironment {
  name: 'local' | 'dev' | 'qa' | 'production';
  production: boolean;
  apiBaseUrl: string;
  publicSite: PublicSiteEnvironmentConfig;
}
