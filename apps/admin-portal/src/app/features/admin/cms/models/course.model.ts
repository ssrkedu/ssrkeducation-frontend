export type CoursePublishStatus = 'Published' | 'Draft' | 'Archived';

export interface CourseListItemVm {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
  code: string;
  duration: string;
  seats: number | null;
  status: CoursePublishStatus;
  updatedOn: string;
}

export interface CmsInstitutionVm {
  id: string;
  code: string;
  slug: string;
  name: string;
  status: string;
}

export type CmsSection =
  | 'home'
  | 'chrome'
  | 'courses'
  | 'scholarships';

export interface CourseTranslationVm {
  languageCode: string;
  name: string;
  summary: string | null;
  description: string | null;
  eligibility: string | null;
  feeDisplayText: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface CourseDetailVm {
  id: string;
  institutionId: string;
  code: string;
  slug: string;
  status: CoursePublishStatus;
  sortOrder: number;
  duration: string;
  seats: number | null;
  translations: CourseTranslationVm[];
}
