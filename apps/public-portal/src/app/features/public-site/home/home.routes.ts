import { Routes } from '@angular/router';
import { institutionSiteGuard, trustSiteGuard } from '../public-site.guards';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    canMatch: [trustSiteGuard],
    loadComponent: () =>
      import('./pages/trust-home-page/trust-home-page.component').then(
        (m) => m.TrustHomePageComponent,
      ),
  },
  {
    path: '',
    canMatch: [institutionSiteGuard],
    loadComponent: () =>
      import('./pages/institution-home-page/institution-home-page.component').then(
        (m) => m.InstitutionHomePageComponent,
      ),
  },
];
