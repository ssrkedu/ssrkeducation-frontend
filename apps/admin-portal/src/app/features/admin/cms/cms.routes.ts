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
