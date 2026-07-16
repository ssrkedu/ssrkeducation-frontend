export interface CmsInstitutionDto {
  id: string;
  code: string;
  slug: string;
  name: string;
  status: string;
}

export interface CmsCourseListItemDto {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
  code: string;
  status: string;
  sortOrder: number;
  duration: string;
  seats: number | null;
  updatedAtUtc: string | null;
}

export interface CmsCourseTranslationDto {
  languageCode: string;
  name: string;
  summary: string | null;
  description: string | null;
  eligibility: string | null;
  feeDisplayText: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface CmsCourseDetailDto {
  id: string;
  institutionId: string;
  code: string;
  slug: string;
  status: string;
  sortOrder: number;
  duration: string;
  seats: number | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  translations: CmsCourseTranslationDto[];
}

export interface CmsSiteTranslationDto {
  languageCode: string;
  name: string;
  tagline: string | null;
}

export interface CmsTrustSiteDto {
  tenantKey: string;
  primaryColor: string | null;
  logoUrl: string | null;
  translations: CmsSiteTranslationDto[];
}

export interface CmsPageSeoTranslationDto {
  languageCode: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface CmsPageSectionSummaryDto {
  sectionKey: string;
  componentType: string;
  status: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface CmsTrustPageDto {
  pageKey: string;
  status: string;
  sections: CmsPageSectionSummaryDto[];
  seoTranslations: CmsPageSeoTranslationDto[];
}

export interface CmsSectionTranslationDto {
  languageCode: string;
  payload: string;
}

export interface CmsTrustSectionDto {
  sectionKey: string;
  componentType: string;
  status: string;
  isVisible: boolean;
  sortOrder: number;
  sharedPayload: string;
  translations: CmsSectionTranslationDto[];
}

export interface CmsInstitutionTranslationDto {
  languageCode: string;
  name: string;
  shortName: string | null;
  description: string | null;
  coursesLine: string | null;
  programsLine: string | null;
}

export interface CmsInstitutionDetailDto {
  id: string;
  code: string;
  slug: string;
  subdomain: string;
  status: string;
  logoUrl: string | null;
  primaryColor: string | null;
  iconKey: string | null;
  iconBackgroundColor: string | null;
  iconStrokeColor: string | null;
  sortOrder: number;
  translations: CmsInstitutionTranslationDto[];
}

export interface CmsScholarshipListItemDto {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
  code: string;
  status: string;
  sortOrder: number;
  deadlineUtc: string | null;
  checkEligibilityUrl: string | null;
  moreInfoUrl: string | null;
  updatedAtUtc: string | null;
}

export interface CmsScholarshipTranslationDto {
  languageCode: string;
  name: string;
  summary: string | null;
  eligibility: string | null;
  benefit: string | null;
  howToApply: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface CmsScholarshipDetailDto {
  id: string;
  institutionId: string;
  code: string;
  slug: string;
  status: string;
  sortOrder: number;
  deadlineUtc: string | null;
  checkEligibilityUrl: string | null;
  moreInfoUrl: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  translations: CmsScholarshipTranslationDto[];
}
