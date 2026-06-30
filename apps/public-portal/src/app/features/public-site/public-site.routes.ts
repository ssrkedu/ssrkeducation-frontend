import { Routes } from '@angular/router';
import { PublicSiteLayoutRouterComponent } from './layouts/public-site-layout-router/public-site-layout-router.component';
import {
  institutionPageGuard,
  institutionSiteGuard,
  trustSiteGuard,
} from './public-site.guards';

export const PUBLIC_SITE_ROUTES: Routes = [
  {
    path: '',
    component: PublicSiteLayoutRouterComponent,
    children: [
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
      {
        path: 'institutions',
        canMatch: [trustSiteGuard],
        loadComponent: () =>
          import('./pages/institutions-page/institutions-page.component').then(
            (m) => m.InstitutionsPageComponent,
          ),
      },
      {
        path: 'courses',
        canMatch: [institutionPageGuard('courses')],
        loadComponent: () =>
          import('./pages/institution-courses-page/institution-courses-page.component').then(
            (m) => m.InstitutionCoursesPageComponent,
          ),
      },
      {
        path: 'courses/:courseSlug',
        canMatch: [institutionPageGuard('courses')],
        loadComponent: () =>
          import(
            './pages/institution-course-detail-page/institution-course-detail-page.component'
          ).then((m) => m.InstitutionCourseDetailPageComponent),
      },
      {
        path: 'scholarships',
        canMatch: [institutionPageGuard('scholarships')],
        loadComponent: () =>
          import(
            './pages/institution-scholarships-page/institution-scholarships-page.component'
          ).then((m) => m.InstitutionScholarshipsPageComponent),
      },
      {
        path: 'gallery',
        canMatch: [institutionPageGuard('gallery')],
        loadComponent: () =>
          import('./pages/institution-gallery-page/institution-gallery-page.component').then(
            (m) => m.InstitutionGalleryPageComponent,
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
