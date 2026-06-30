import { Routes } from '@angular/router';
import { institutionPageGuard } from '../public-site.guards';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    canMatch: [institutionPageGuard('courses')],
    loadComponent: () =>
      import('./pages/institution-courses-page/institution-courses-page.component').then(
        (m) => m.InstitutionCoursesPageComponent,
      ),
  },
  {
    path: ':courseSlug',
    canMatch: [institutionPageGuard('courses')],
    loadComponent: () =>
      import(
        './pages/institution-course-detail-page/institution-course-detail-page.component'
      ).then((m) => m.InstitutionCourseDetailPageComponent),
  },
];
