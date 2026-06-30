import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/trust-home-page/trust-home-page.component').then(
        (m) => m.TrustHomePageComponent,
      ),
  },
];
