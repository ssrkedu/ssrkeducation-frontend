import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'dev',
  production: false,
  apiBaseUrl: 'https://ssrkeducation-backend.onrender.com',
  publicSite: {
    protocol: 'https',
    // Institution links → https://ssrkdc.dev.ssrkedu.in (wildcard DNS → Netlify)
    apexDomain: 'dev.ssrkedu.in',
    port: null,
    mainHosts: ['dev.ssrkedu.in', 'www.dev.ssrkedu.in', 'dev-ssrkedu.netlify.app'],
  },
};
