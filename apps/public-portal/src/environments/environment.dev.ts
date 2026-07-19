import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'dev',
  production: false,
  apiBaseUrl: 'https://ssrkeducation-backend.onrender.com',
  publicSite: {
    protocol: 'https',
    // Institution links → https://ssrkdc.dev.ssrkedu.com (wildcard DNS → Netlify)
    apexDomain: 'dev.ssrkedu.com',
    port: null,
    mainHosts: ['dev.ssrkedu.com', 'www.dev.ssrkedu.com', 'dev-ssrkedu.netlify.app'],
  },
};
