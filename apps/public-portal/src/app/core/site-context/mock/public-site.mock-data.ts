import { CourseSummary, SiteContext } from '../site-context.model';

/** Temporary mock registry until GET /api/public/sites/resolve is available. */
export const MOCK_SITE_REGISTRY: Record<string, SiteContext> = {
  trust: {
    siteType: 'trust',
    tenantKey: 'trust',
    institutionId: null,
    name: 'SRI SAI RAMA KRISHNA GROUP OF INSTITUTIONS',
    tagline: 'Empowering Odisha',
    theme: { primaryColor: '#1e3a8a' },
    logoUrl: null,
    enabledPages: ['home', 'institutions'],
  },
  ssrkdc: {
    siteType: 'institution',
    tenantKey: 'ssrkdc',
    institutionId: 'inst-ssrkdc',
    name: 'Sri Sai Rama Krishna Degree College',
    tagline: 'Excellence in higher education',
    theme: { primaryColor: '#0f766e' },
    logoUrl: null,
    enabledPages: ['home', 'courses', 'scholarships', 'gallery'],
  },
  ssrkjc: {
    siteType: 'institution',
    tenantKey: 'ssrkjc',
    institutionId: 'inst-ssrkjc',
    name: 'Sri Sai Rama Krishna Junior College',
    tagline: 'Building strong foundations',
    theme: { primaryColor: '#7c3aed' },
    logoUrl: null,
    enabledPages: ['home', 'courses', 'scholarships', 'gallery'],
  },
};

export const MOCK_COURSES: CourseSummary[] = [
  {
    id: 'course-bsc-cs',
    institutionId: 'inst-ssrkdc',
    name: 'B.Sc Computer Science',
    slug: 'bsc-computer-science',
    description:
      'A comprehensive undergraduate program covering programming, databases, and software engineering.',
  },
  {
    id: 'course-bcom',
    institutionId: 'inst-ssrkdc',
    name: 'B.Com',
    slug: 'bcom',
    description:
      'Commerce program focused on accounting, finance, and business management.',
  },
  {
    id: 'course-science',
    institutionId: 'inst-ssrkjc',
    name: 'Science Stream (+2)',
    slug: 'science-stream',
    description:
      'Physics, chemistry, mathematics, and biology for science-oriented students.',
  },
  {
    id: 'course-commerce',
    institutionId: 'inst-ssrkjc',
    name: 'Commerce Stream (+2)',
    slug: 'commerce-stream',
    description: 'Accountancy, business studies, and economics for commerce students.',
  },
];
