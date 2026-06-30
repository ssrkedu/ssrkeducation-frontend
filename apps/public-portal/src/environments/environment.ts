import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'production',
  production: true,
  apiBaseUrl: 'https://api.ssrkeducation.com',
  publicSite: {
    protocol: 'https',
    apexDomain: 'ssrkeducation.com',
    port: null,
    mainHosts: ['ssrkeducation.com', 'www.ssrkeducation.com'],
  },
};
