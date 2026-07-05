import { HeroCarouselSlide, StatsBarConfig } from '@ssrk/shared/ui';

export interface AnnouncementsSectionPayloadDto {
  label?: string;
  ariaLabel?: string;
  items?: { id: string; text: string }[];
}

export interface HeroSectionPayloadDto {
  slides?: HeroCarouselSlide[];
}

export interface StatsSectionPayloadDto {
  ariaLabel?: string;
  items?: StatsBarConfig['items'];
}

export interface AboutSectionPayloadDto {
  sectionLabel: string;
  title: string;
  description: string;
  highlights: string[];
  cta: { label: string; href: string };
  founder: {
    quote: string;
    name: string;
    role: string;
    avatarInitial: string;
    badge: string;
    badgeNote: string;
  };
}

export interface HomeInstitutionsSectionPayloadDto {
  sectionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
}

export interface EnquirySectionPayloadDto {
  sectionLabel: string;
  title: string;
  description: string;
  highlights: readonly string[];
}

export interface InstitutionsPageSectionPayloadDto {
  sectionLabel: string;
  title: string;
  description: string;
  cardCtaLabel: string;
}
