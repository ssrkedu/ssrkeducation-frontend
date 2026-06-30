import { Routes } from '@angular/router';
import { PublicSiteLayoutComponent } from './layout/public-site-layout.component';
import { trustSiteGuard } from './public-site.guards';

export const PUBLIC_SITE_ROUTES: Routes = [
  {
    path: '',
    component: PublicSiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'institutions',
        canMatch: [trustSiteGuard],
        loadChildren: () =>
          import('./institutions/institutions.routes').then((m) => m.INSTITUTIONS_ROUTES),
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.routes').then((m) => m.COURSES_ROUTES),
      },
      {
        path: 'scholarships',
        loadChildren: () =>
          import('./scholarships/scholarships.routes').then((m) => m.SCHOLARSHIPS_ROUTES),
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.routes').then((m) => m.GALLERY_ROUTES),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
