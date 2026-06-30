import { Routes } from '@angular/router';

export const TRUST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/trust-layout.component').then((m) => m.TrustLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
    ],
  },
];
