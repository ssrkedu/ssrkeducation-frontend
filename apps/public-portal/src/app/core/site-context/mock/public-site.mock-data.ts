import {
  CourseSummary,
  InstitutionSummary,
  SiteContext,
} from '../site-context.model';

/** Temporary mock registry until GET /api/public/sites/resolve is available. */
export const MOCK_SITE_REGISTRY: Record<string, SiteContext> = {
  trust: {
    siteType: 'trust',
    tenantKey: 'trust',
    institutionId: null,
    name: 'SSRK Educational Trust',
    tagline: 'Empowering Odisha',
    theme: { primaryColor: '#1e3a8a' },
    logoUrl: null,
    enabledPages: ['home', 'institutions'],
  },
  ssrkdc: {
    siteType: 'institution',
    tenantKey: 'ssrkdc',
    institutionId: 'inst-ssrkdc',
    name: 'SSRK Degree College',
    tagline: 'Excellence in higher education',
    theme: { primaryColor: '#0f766e' },
    logoUrl: null,
    enabledPages: ['home', 'courses', 'scholarships', 'gallery'],
  },
  ssrkjc: {
    siteType: 'institution',
    tenantKey: 'ssrkjc',
    institutionId: 'inst-ssrkjc',
    name: 'SSRK Junior College',
    tagline: 'Building strong foundations',
    theme: { primaryColor: '#7c3aed' },
    logoUrl: null,
    enabledPages: ['home', 'courses', 'scholarships', 'gallery'],
  },
};

export const MOCK_INSTITUTIONS: InstitutionSummary[] = [
  {
    id: 'inst-ssrkdc',
    code: 'ssrkdc',
    subdomain: 'ssrkdc',
    name: 'SSRK Degree College',
    description:
      'Undergraduate programs in arts, science, commerce, and management.',
    logoUrl: null,
  },
  {
    id: 'inst-ssrkjc',
    code: 'ssrkjc',
    subdomain: 'ssrkjc',
    name: 'SSRK Junior College',
    description: 'Plus-two programs preparing students for higher education.',
    logoUrl: null,
  },
];

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
