export type HeroCarouselActionVariant = 'primary' | 'outline';

export interface HeroCarouselAction {
  label: string;
  href?: string;
  routerLink?: string | unknown[];
  variant?: HeroCarouselActionVariant;
  hidden?: boolean;
}

export type HeroCarouselTheme = 'scholarship' | 'institutions' | 'default';

export interface HeroCarouselSlide {
  id?: string;
  badge: string;
  title: string;
  description: string;
  theme?: HeroCarouselTheme;
  backgroundImage?: string;
  primaryAction: HeroCarouselAction;
  secondaryAction?: HeroCarouselAction;
}

export interface HeroCarouselOptions {
  autoplayInterval?: number;
  circular?: boolean;
  ariaLabel?: string;
}

export const DEFAULT_HERO_CAROUSEL_OPTIONS: Required<HeroCarouselOptions> = {
  autoplayInterval: 5000,
  circular: true,
  ariaLabel: 'Hero banner',
};
