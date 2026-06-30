import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/public-site/public-site.routes').then(
        (m) => m.PUBLIC_SITE_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
