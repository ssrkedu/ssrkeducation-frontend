import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'dev',
  production: false,
  apiBaseUrl: 'https://dev-api.ssrkeducation.com',
  publicSite: {
    protocol: 'https',
    apexDomain: 'dev.ssrkeducation.com',
    port: null,
    mainHosts: ['dev.ssrkeducation.com','dev-ssrkedu.netlify.app'],
  },
};
