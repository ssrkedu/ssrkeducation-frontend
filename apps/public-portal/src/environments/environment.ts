import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'production',
  production: true,
  // Update when custom API domain is live; currently matches deployed Render API.
  apiBaseUrl: 'https://ssrkeducation-backend.onrender.com',
  publicSite: {
    protocol: 'https',
    apexDomain: 'ssrkedu.in',
    port: null,
    mainHosts: [
      'ssrkedu.in',
      'www.ssrkedu.in',
      'ssrkeducation.com',
      'www.ssrkeducation.com',
    ],
    adminPortalUrl: 'https://admin.ssrkedu.in',
  },
};
