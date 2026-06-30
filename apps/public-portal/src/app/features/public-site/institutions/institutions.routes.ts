import { Routes } from '@angular/router';

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/institutions-page/institutions-page.component').then(
        (m) => m.InstitutionsPageComponent,
      ),
  },
];
