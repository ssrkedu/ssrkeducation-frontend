import { Routes } from '@angular/router';

export const ENQUIRIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/enquiries-list-page/enquiries-list-page.component').then(
        (m) => m.EnquiriesListPageComponent,
      ),
    data: { pageTitle: 'Enquiry Management' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/enquiry-detail-page/enquiry-detail-page.component').then(
        (m) => m.EnquiryDetailPageComponent,
      ),
    data: { pageTitle: 'Enquiry Detail' },
  },
];
