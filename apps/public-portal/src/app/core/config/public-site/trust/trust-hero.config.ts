// FALLBACK-PHASE: static content kept for content-fallback plan.
// Image paths are local preview assets until CMS/media URLs land.

import { HeroCarouselSlide } from '@ssrk/shared/ui';

const TRUST_HERO_IMAGE_BASE = '/assets/images/trust';

export const TRUST_HERO_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'scholarship',
    badge: 'Admissions Open',
    title: 'Get Up to 100% Scholarship',
    description: 'For eligible students across selected SSRK courses.',
    theme: 'scholarship',
    backgroundImage: `${TRUST_HERO_IMAGE_BASE}/ssrk_classroom_studentsExam_2.jpeg`,
    supportImages: [
      {
        src: `${TRUST_HERO_IMAGE_BASE}/ssrk_classroom_studentsExam_1.jpeg`,
        alt: 'Students attending classroom session at SSRK',
      },
      {
        src: `${TRUST_HERO_IMAGE_BASE}/ssrk_classroom_teacher_students_1.jpeg`,
        alt: 'Teacher guiding students at SSRK',
      },
    ],
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
    backgroundImage: `${TRUST_HERO_IMAGE_BASE}/ssrkdc_hero_entrance_1.jpeg`,
    supportImages: [
      {
        src: `${TRUST_HERO_IMAGE_BASE}/ssrk_group_faculty_1.jpeg`,
        alt: 'SSRK faculty group',
      },
      {
        src: `${TRUST_HERO_IMAGE_BASE}/ssrk_group_faculty_students_2.jpeg`,
        alt: 'SSRK faculty and students group',
      },
    ],
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
