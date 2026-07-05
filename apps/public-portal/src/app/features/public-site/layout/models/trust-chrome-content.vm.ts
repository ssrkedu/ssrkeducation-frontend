import {
  MobileEnquireBarConfig,
  MobileNavDrawerConfig,
} from '@ssrk/shared/ui';

export interface TrustNavChildLinkVm {
  label: string;
  routerLink?: string;
  href?: string;
}

export interface TrustHeaderNavLinkVm {
  label: string;
  routerLink?: string;
  href?: string;
  exact?: boolean;
  cta?: boolean;
  children?: TrustNavChildLinkVm[];
}

export interface TrustContactContentVm {
  phones: string[];
  emails: string[];
  address: string;
  mobilePhone?: string;
  mobileEmail?: string;
  locationLine?: string;
}

export interface TrustSocialLinkVm {
  label: string;
  href: string;
  glyph: string;
}

export interface TrustFooterIntroContentVm {
  description: string;
  locationLine: string;
}

export interface TrustChromeContentVm {
  navLinks: TrustHeaderNavLinkVm[];
  contact: TrustContactContentVm;
  socialLinks: TrustSocialLinkVm[];
  footerIntro: TrustFooterIntroContentVm;
  mobileNavConfig: MobileNavDrawerConfig;
  mobileEnquireConfig: MobileEnquireBarConfig;
  institutionFooterLinks: TrustNavChildLinkVm[];
}
