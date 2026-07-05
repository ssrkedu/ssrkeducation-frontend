import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users-list-page/users-list-page.component').then(
        (m) => m.UsersListPageComponent,
      ),
    data: { pageTitle: 'User Management' },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent,
      ),
    data: { pageTitle: 'User Editor' },
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent,
      ),
    data: { pageTitle: 'User Editor' },
  },
];
