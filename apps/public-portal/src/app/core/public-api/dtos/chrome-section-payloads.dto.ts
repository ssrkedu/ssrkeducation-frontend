import { MobileNavDrawerConfig } from '@ssrk/shared/ui';

export interface ChromeNavLinkPayloadDto {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  cta?: boolean;
}

export interface ChromeNavSectionPayloadDto {
  links?: ChromeNavLinkPayloadDto[];
}

export interface ChromeContactSectionPayloadDto {
  phones?: string[];
  emails?: string[];
  address?: string;
  mobilePhone?: string;
  mobileEmail?: string;
  locationLine?: string;
}

export interface ChromeSocialLinkPayloadDto {
  label: string;
  href: string;
  glyph: string;
}

export interface ChromeSocialSectionPayloadDto {
  links?: ChromeSocialLinkPayloadDto[];
}

export interface ChromeFooterIntroSectionPayloadDto {
  description?: string;
  locationLine?: string;
}

export interface ChromeMobileNavSectionPayloadDto {
  title?: string;
  ariaLabel?: string;
  items?: MobileNavDrawerConfig['items'];
  cta?: MobileNavDrawerConfig['cta'];
  contacts?: MobileNavDrawerConfig['contacts'];
}

export interface ChromeMobileEnquireSectionPayloadDto {
  label?: string;
  routerLink?: string;
  fragment?: string;
  hideWhenSectionId?: string;
  visibleOnlyOnRoutes?: string[];
}
