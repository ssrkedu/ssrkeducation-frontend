export const API_ROUTES = {
  admin: {
    auth: {
      login: 'api/admin/auth/login',
      refresh: 'api/admin/auth/refresh',
      logout: 'api/admin/auth/logout',
      me: 'api/admin/auth/me',
    },
    dashboard: {
      summary: 'api/admin/dashboard/summary',
    },
    enquiries: {
      list: 'api/admin/enquiries',
      export: 'api/admin/enquiries/export',
      detail: 'api/admin/enquiries/{id}',
      status: 'api/admin/enquiries/{id}/status',
      notes: 'api/admin/enquiries/{id}/notes',
    },
    lookups: {
      institutions: 'api/admin/lookups/institutions',
      courses: 'api/admin/lookups/courses',
    },
    cms: {
      institutions: 'api/admin/cms/institutions',
      institutionDetail: 'api/admin/cms/institutions/{id}',
      institutionStatus: 'api/admin/cms/institutions/{id}/status',
      institutionCourses: 'api/admin/cms/institutions/{institutionId}/courses',
      courseBySlug: 'api/admin/cms/institutions/{institutionId}/courses/by-slug/{slug}',
      courseDetail: 'api/admin/cms/courses/{id}',
      courseStatus: 'api/admin/cms/courses/{id}/status',
      trustSite: 'api/admin/cms/sites/trust',
      trustPage: 'api/admin/cms/sites/trust/pages/{pageKey}',
      trustPageSeo: 'api/admin/cms/sites/trust/pages/{pageKey}/seo',
      trustSection: 'api/admin/cms/sites/trust/pages/{pageKey}/sections/{sectionKey}',
      trustSectionStatus:
        'api/admin/cms/sites/trust/pages/{pageKey}/sections/{sectionKey}/status',
      institutionPage: 'api/admin/cms/institutions/{institutionId}/pages/{pageKey}',
      institutionSection:
        'api/admin/cms/institutions/{institutionId}/pages/{pageKey}/sections/{sectionKey}',
      institutionSectionStatus:
        'api/admin/cms/institutions/{institutionId}/pages/{pageKey}/sections/{sectionKey}/status',
      institutionScholarships: 'api/admin/cms/institutions/{institutionId}/scholarships',
      scholarshipBySlug:
        'api/admin/cms/institutions/{institutionId}/scholarships/by-slug/{slug}',
      scholarshipDetail: 'api/admin/cms/scholarships/{id}',
      scholarshipStatus: 'api/admin/cms/scholarships/{id}/status',
    },
    users: {
      list: 'api/admin/users',
      detail: 'api/admin/users/{id}',
      permissions: 'api/admin/users/{id}/permissions',
      status: 'api/admin/users/{id}/status',
    },
  },
} as const;
