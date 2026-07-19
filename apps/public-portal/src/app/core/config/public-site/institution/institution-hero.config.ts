// FALLBACK-PHASE: local preview hero until CMS media URLs land.

import { HeroCarouselSlide } from '@ssrk/shared/ui';

const SSRKDC_HERO_IMAGE =
  '/assets/images/institutions/ssrkdc/ssrkdc_hero_entrance_1.jpeg';

const SSRKJC_HERO_IMAGE =
  '/assets/images/institutions/ssrkjc/ssrk_group_faculty_1.jpeg';

/** Single official banner — no collage, no multi-slide. */
const INSTITUTION_HERO_BY_TENANT: Record<string, HeroCarouselSlide> = {
  ssrkdc: {
    id: 'hero',
    badge: 'SSRK Degree College',
    title: 'Build Your Future with Quality Degree Education',
    description:
      'Explore courses, scholarships, admissions, faculty, and student support at SSRK Degree College.',
    theme: 'institution',
    backgroundImage: SSRKDC_HERO_IMAGE,
    primaryAction: {
      label: 'View Courses',
      routerLink: '/courses',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'Enquire Now',
      href: '#enquiry',
      variant: 'outline',
    },
  },
  ssrkjc: {
    id: 'hero',
    badge: 'SSRK Junior College (+2)',
    title: 'Build Your Future with Quality +2 Education',
    description:
      'Explore courses, scholarships, admissions, faculty, and student support at SSRK Junior College.',
    theme: 'institution',
    backgroundImage: SSRKJC_HERO_IMAGE,
    primaryAction: {
      label: 'View Courses',
      routerLink: '/courses',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'Enquire Now',
      href: '#enquiry',
      variant: 'outline',
    },
  },
};

export function getInstitutionHeroPreview(
  tenantKey: string,
): HeroCarouselSlide | null {
  return INSTITUTION_HERO_BY_TENANT[tenantKey] ?? null;
}
