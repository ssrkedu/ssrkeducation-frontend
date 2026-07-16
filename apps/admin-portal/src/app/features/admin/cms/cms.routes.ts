import { Routes } from '@angular/router';

export const CMS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/cms-courses-page/cms-courses-page.component').then(
        (m) => m.CmsCoursesPageComponent,
      ),
    data: { pageTitle: 'Content Management' },
  },
  {
    path: 'trust/branding',
    loadComponent: () =>
      import('./pages/trust-branding-edit-page/trust-branding-edit-page.component').then(
        (m) => m.TrustBrandingEditPageComponent,
      ),
    data: { pageTitle: 'Site Branding' },
  },
  {
    path: 'trust/:pageKey/seo',
    loadComponent: () =>
      import('./pages/trust-seo-edit-page/trust-seo-edit-page.component').then(
        (m) => m.TrustSeoEditPageComponent,
      ),
    data: { pageTitle: 'Page SEO' },
  },
  {
    path: 'trust/:pageKey/sections/:sectionKey/edit',
    loadComponent: () =>
      import('./pages/trust-section-edit-page/trust-section-edit-page.component').then(
        (m) => m.TrustSectionEditPageComponent,
      ),
    data: { pageTitle: 'Section Editor' },
  },
  {
    path: 'institutions/:institutionId/pages/:pageKey/sections/:sectionKey/edit',
    loadComponent: () =>
      import('./pages/trust-section-edit-page/trust-section-edit-page.component').then(
        (m) => m.TrustSectionEditPageComponent,
      ),
    data: { pageTitle: 'Institution Section Editor' },
  },
  {
    path: 'scholarships/new',
    loadComponent: () =>
      import('./pages/scholarship-edit-page/scholarship-edit-page.component').then(
        (m) => m.ScholarshipEditPageComponent,
      ),
    data: { pageTitle: 'Scholarship Editor' },
  },
  {
    path: 'scholarships/:slug/edit',
    loadComponent: () =>
      import('./pages/scholarship-edit-page/scholarship-edit-page.component').then(
        (m) => m.ScholarshipEditPageComponent,
      ),
    data: { pageTitle: 'Scholarship Editor' },
  },
  {
    path: 'registry/:id/edit',
    loadComponent: () =>
      import(
        './pages/institution-registry-edit-page/institution-registry-edit-page.component'
      ).then((m) => m.InstitutionRegistryEditPageComponent),
    data: { pageTitle: 'Institution Registry' },
  },
  {
    path: 'courses/new',
    loadComponent: () =>
      import('./pages/course-edit-page/course-edit-page.component').then(
        (m) => m.CourseEditPageComponent,
      ),
    data: { pageTitle: 'Course Editor' },
  },
  {
    path: 'courses/:slug/edit',
    loadComponent: () =>
      import('./pages/course-edit-page/course-edit-page.component').then(
        (m) => m.CourseEditPageComponent,
      ),
    data: { pageTitle: 'Course Editor' },
  },
];
