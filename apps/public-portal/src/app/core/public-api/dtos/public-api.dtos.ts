export interface LanguageResolutionDto {
  requested: string;
  resolved: string;
  fallbackApplied: boolean;
  fallbackReason?: string | null;
}

export interface ResolveSiteDto {
  site: ResolvedSiteDto;
  domain: ResolvedDomainDto;
  language: LanguageResolutionDto;
}

export interface ResolvedSiteDto {
  id: string;
  siteType: string;
  tenantKey: string;
  institutionId: string | null;
  name: string;
  tagline: string | null;
  logoUrl: string | null;
  primaryColor: string | null;
  enabledPages: string[];
  defaultLanguageCode: string;
  status: string;
}

export interface ResolvedDomainDto {
  hostName: string;
  isPrimary: boolean;
}

export interface PageContentDto {
  page: PageContentPageDto;
  sections: PageContentSectionDto[];
  language: LanguageResolutionDto;
}

export interface PageContentPageDto {
  id: string;
  pageKey: string;
  routePath: string;
  title: string;
  seo: PageContentSeoDto;
}

export interface PageContentSeoDto {
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface PageContentSectionDto {
  id: string;
  sectionKey: string;
  componentType: string;
  layoutVariant: string | null;
  sortOrder: number;
  payload: unknown;
}

export interface InstitutionsListDto {
  items: InstitutionItemDto[];
  language: LanguageResolutionDto;
}

export interface InstitutionItemDto {
  id: string;
  code: string;
  slug: string;
  subdomain: string;
  name: string;
  shortName: string | null;
  description: string | null;
  logoUrl: string | null;
  primaryColor: string | null;
  coursesLine: string | null;
  programsLine: string | null;
  iconKey: string | null;
  iconBackgroundColor: string | null;
  iconStrokeColor: string | null;
  sortOrder: number;
  href: string;
}

export interface InterestTopicsListDto {
  items: InterestTopicItemDto[];
  language: LanguageResolutionDto;
}

export interface InterestTopicItemDto {
  code: string;
  label: string;
}

export interface CreateEnquiryRequestDto {
  institutionCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  interestCodes: string[];
  message?: string | null;
  source: string;
}

export interface CreateEnquiryResponseDto {
  id: string;
  status: string;
  message: string;
}
