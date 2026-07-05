export type TrustLanguage = 'en' | 'od';

export interface TrustNavChildLink {
  label: string;
  href: string;
}

export interface TrustNavLink {
  label: string;
  href: string;
  children?: TrustNavChildLink[];
  cta?: boolean;
}

export interface TrustFooterLink {
  label: string;
  href: string;
}
