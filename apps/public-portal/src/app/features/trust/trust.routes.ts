import { Routes } from '@angular/router';
import { TrustLayoutComponent } from './layout/trust-layout.component';

export const TRUST_ROUTES: Routes = [
  {
    path: '',
    component: TrustLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/trust-home-page/trust-home-page.component').then(
            (m) => m.TrustHomePageComponent,
          ),
      },
    ],
  },
];
