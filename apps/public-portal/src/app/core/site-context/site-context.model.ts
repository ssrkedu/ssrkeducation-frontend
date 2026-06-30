export type SiteType = 'trust' | 'institution';

export type PublicPageKey =
  | 'home'
  | 'institutions'
  | 'courses'
  | 'scholarships'
  | 'gallery';

export interface SiteTheme {
  primaryColor: string;
}

export interface SiteContext {
  siteType: SiteType;
  tenantKey: string;
  institutionId: string | null;
  name: string;
  tagline: string;
  theme: SiteTheme;
  logoUrl: string | null;
  enabledPages: PublicPageKey[];
}

export interface InstitutionSummary {
  id: string;
  code: string;
  subdomain: string;
  name: string;
  description: string;
  logoUrl: string | null;
}

export interface CourseSummary {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
  description: string;
}
