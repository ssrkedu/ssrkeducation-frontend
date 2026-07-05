// FALLBACK-PHASE: static content kept for content-fallback plan.
// Home page now loads this data from GET /api/public/sites/trust/pages/home

export const TRUST_ABOUT = {
  sectionLabel: 'About SSRK Edu',
  title: 'Guiding Students Toward the Right Education Path',
  description:
    'SSRK Edu helps students and parents explore institutions, courses, admissions, and scholarship support in one place. With a focus on accessible education and student guidance, we help every learner choose the right academic path with confidence.',
  highlights: [
    "NAAC 'B++' Accredited",
    'UGC & AICTE Approved',
    'Affiliated to Utkal University',
    'Scholarship Support Available',
    'Admission Guidance',
  ],
  cta: { label: 'Explore Institutions', href: '#institutions' },
  founder: {
    quote:
      'Education should not be limited by background, location, or financial difficulty. Our goal is to guide every student toward the right course, the right institution, and a future they can build with confidence.',
    name: 'Sri Ramakrishna',
    role: 'Founder, SSRK Edu',
    avatarInitial: 'S',
    badge: 'NAAC B++',
    badgeNote: 'Recognitions and affiliations are shown as applicable to each institution.',
  },
} as const;
