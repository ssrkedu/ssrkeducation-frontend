export type CoursePublishStatus = 'Published' | 'Draft';

export interface CourseItem {
  name: string;
  slug: string;
  duration: string;
  seats: number;
  status: CoursePublishStatus;
  updatedOn: string;
}

export type CmsInstitutionContext = 'ssrk' | 'dc' | 'jc';

export type CmsSection =
  | 'home'
  | 'about'
  | 'courses'
  | 'faculty'
  | 'scholarships'
  | 'gallery'
  | 'contact'
  | 'seo';
