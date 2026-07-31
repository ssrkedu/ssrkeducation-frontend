import { CmsCourseTranslationDto } from '../dtos/cms.dto';

export interface CmsCourseTranslationRequest {
  languageCode: string;
  name: string;
  summary?: string | null;
  description?: string | null;
  eligibility?: string | null;
  feeDisplayText?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface CreateCmsCourseRequest {
  code: string;
  slug: string;
  sortOrder: number;
  translations: CmsCourseTranslationRequest[];
}

export interface UpdateCmsCourseRequest extends CreateCmsCourseRequest {}

export interface SetCmsCourseStatusRequest {
  status: string;
}

export interface UpdateCmsTrustSiteRequest {
  primaryColor?: string | null;
  logoUrl?: string | null;
  translations: Array<{
    languageCode: string;
    name: string;
    tagline?: string | null;
  }>;
}

export interface UpdateCmsPageSeoRequest {
  translations: Array<{
    languageCode: string;
    title: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
  }>;
}

export interface UpdateCmsTrustSectionRequest {
  sharedPayload?: string | null;
  translations: Array<{
    languageCode: string;
    payload: string;
  }>;
}

export interface SetCmsSectionStatusRequest {
  status: string;
  isVisible?: boolean | null;
}

export interface UpdateCmsInstitutionRequest {
  slug: string;
  subdomain: string;
  logoUrl?: string | null;
  primaryColor?: string | null;
  iconKey?: string | null;
  iconBackgroundColor?: string | null;
  iconStrokeColor?: string | null;
  sortOrder: number;
  translations: Array<{
    languageCode: string;
    name: string;
    shortName?: string | null;
    description?: string | null;
    coursesLine?: string | null;
    programsLine?: string | null;
  }>;
}

export interface SetCmsInstitutionStatusRequest {
  status: string;
}

export interface CreateCmsScholarshipRequest {
  code: string;
  slug: string;
  sortOrder: number;
  deadlineUtc?: string | null;
  checkEligibilityUrl?: string | null;
  moreInfoUrl?: string | null;
  translations: Array<{
    languageCode: string;
    name: string;
    summary?: string | null;
    eligibility?: string | null;
    benefit?: string | null;
    howToApply?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
  }>;
}

export interface UpdateCmsScholarshipRequest extends CreateCmsScholarshipRequest {}

export interface SetCmsScholarshipStatusRequest {
  status: string;
}

export interface UpdateCmsLanguageRequirementsRequest {
  items: Array<{
    languageCode: string;
    isRequired: boolean;
  }>;
}

export type { CmsCourseTranslationDto };
