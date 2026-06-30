import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/trust/trust.routes').then((m) => m.TRUST_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
