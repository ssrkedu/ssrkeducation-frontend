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

export interface CourseSummary {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
  description: string;
}
