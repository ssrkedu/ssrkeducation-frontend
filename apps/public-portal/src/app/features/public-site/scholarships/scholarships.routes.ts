import { Routes } from '@angular/router';
import { institutionPageGuard } from '../public-site.guards';

export const SCHOLARSHIPS_ROUTES: Routes = [
  {
    path: '',
    canMatch: [institutionPageGuard('scholarships')],
    loadComponent: () =>
      import(
        './pages/institution-scholarships-page/institution-scholarships-page.component'
      ).then((m) => m.InstitutionScholarshipsPageComponent),
  },
];
