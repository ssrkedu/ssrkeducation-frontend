import { AppEnvironment } from './public-site-environment.model';

export const environment: AppEnvironment = {
  name: 'local',
  production: false,
  apiBaseUrl: 'http://localhost:5206',
  publicSite: {
    protocol: 'http',
    apexDomain: 'lvh.me',
    port: 4200,
    mainHosts: ['localhost', 'ssrkeducation.lvh.me'],
  },
};
