import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'qa',
  production: false,
  apiBaseUrl: 'https://qa-api.ssrkeducation.com',
  publicSite: {
    protocol: 'https',
    apexDomain: 'qa.ssrkeducation.com',
    port: null,
    mainHosts: ['qa.ssrkeducation.com'],
    adminPortalUrl: 'https://qa-admin.ssrkeducation.com',
  },
};
