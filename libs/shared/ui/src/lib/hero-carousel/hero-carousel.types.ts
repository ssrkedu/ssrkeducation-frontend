export type HeroCarouselActionVariant = 'primary' | 'outline';

export interface HeroCarouselAction {
  label: string;
  href?: string;
  routerLink?: string | unknown[];
  variant?: HeroCarouselActionVariant;
  hidden?: boolean;
}

export type HeroCarouselTheme = 'scholarship' | 'institutions' | 'institution' | 'default';

export interface HeroCarouselSupportImage {
  src: string;
  alt: string;
}

export interface HeroCarouselSlide {
  id?: string;
  badge: string;
  title: string;
  description: string;
  theme?: HeroCarouselTheme;
  backgroundImage?: string;
  supportImages?: HeroCarouselSupportImage[];
  primaryAction: HeroCarouselAction;
  secondaryAction?: HeroCarouselAction;
}

export interface HeroCarouselOptions {
  autoplayInterval?: number;
  circular?: boolean;
  ariaLabel?: string;
}

export const DEFAULT_HERO_CAROUSEL_OPTIONS: Required<HeroCarouselOptions> = {
  autoplayInterval: 6000,
  circular: true,
  ariaLabel: 'Hero banner',
};
