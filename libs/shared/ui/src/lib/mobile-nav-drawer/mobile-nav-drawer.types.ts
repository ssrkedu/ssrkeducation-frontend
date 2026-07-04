export interface MobileNavLinkConfig {
  label: string;
  href?: string;
  routerLink?: string | unknown[];
  exact?: boolean;
  hidden?: boolean;
}

export interface MobileNavGroupConfig {
  label: string;
  children: MobileNavLinkConfig[];
  initiallyOpen?: boolean;
  hidden?: boolean;
}

export type MobileNavEntryConfig =
  | ({ type: 'link' } & MobileNavLinkConfig)
  | ({ type: 'group' } & MobileNavGroupConfig);

export interface MobileNavCtaConfig {
  label: string;
  href?: string;
  routerLink?: string | unknown[];
  fragment?: string;
  hidden?: boolean;
}

export interface MobileNavContactConfig {
  icon?: string;
  text: string;
}

export interface MobileNavDrawerConfig {
  title?: string;
  ariaLabel?: string;
  items: MobileNavEntryConfig[];
  cta?: MobileNavCtaConfig;
  contacts?: MobileNavContactConfig[];
}

export interface MobileNavDrawerBreakpoints {
  /** Max viewport width (px) for full-screen drawer. Default: 655. */
  compactMaxWidth?: number;
  /** Min viewport width (px) where desktop nav is shown and drawer auto-closes. Default: 1024. */
  desktopMinWidth?: number;
}

export const DEFAULT_MOBILE_NAV_BREAKPOINTS: Required<MobileNavDrawerBreakpoints> = {
  compactMaxWidth: 655,
  desktopMinWidth: 1024,
};
