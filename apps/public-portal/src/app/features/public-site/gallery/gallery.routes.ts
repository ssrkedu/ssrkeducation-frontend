import { Routes } from '@angular/router';
import { institutionPageGuard } from '../public-site.guards';

export const GALLERY_ROUTES: Routes = [
  {
    path: '',
    canMatch: [institutionPageGuard('gallery')],
    loadComponent: () =>
      import('./pages/institution-gallery-page/institution-gallery-page.component').then(
        (m) => m.InstitutionGalleryPageComponent,
      ),
  },
];
