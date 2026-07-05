// FALLBACK-PHASE: static content kept for content-fallback plan.

import { HeroCarouselSlide } from '@ssrk/shared/ui';

export const TRUST_HERO_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'scholarship',
    badge: 'Admissions Open',
    title: 'Get Up to 100% Scholarship',
    description: 'For eligible students across selected SSRK courses.',
    theme: 'scholarship',
    primaryAction: {
      label: 'Check Eligibility',
      href: '#enquiry',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'Enquire Now',
      href: '#enquiry',
      variant: 'outline',
    },
  },
  {
    id: 'institutions',
    badge: 'Degree & Junior College',
    title: 'Find Your Course at SSRK',
    description: 'Explore colleges, courses, admissions, and scholarship options.',
    theme: 'institutions',
    primaryAction: {
      label: 'Explore Colleges',
      href: '#institutions',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'Apply Now',
      href: '#enquiry',
      variant: 'outline',
    },
  },
];
