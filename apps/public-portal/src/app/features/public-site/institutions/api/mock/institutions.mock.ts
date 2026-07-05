// FALLBACK-PHASE: mock institutions kept for content-fallback plan.
// Institutions list now loads from GET /api/public/sites/trust/institutions

import { InstitutionSummaryDto } from '../dtos/institution-summary.dto';

export const MOCK_INSTITUTIONS: InstitutionSummaryDto[] = [
  {
    id: 'inst-ssrkdc',
    code: 'ssrkdc',
    slug: 'ssrk-degree-college',
    subdomain: 'ssrkdc',
    name: 'Sri Sai Rama Krishna Degree College',
    shortName: 'Degree College',
    description:
      'Undergraduate programs in arts, science, commerce, and management.',
    logoUrl: null,
    primaryColor: '#1e3a8a',
    coursesLine: 'BA · B.Sc · B.Com · MA · M.Sc · M.Com',
    programsLine: 'Arts, Science & Commerce streams',
    iconKey: 'degree',
    iconBackgroundColor: '#EAF4FB',
    iconStrokeColor: '#1A5276',
    sortOrder: 1,
    href: 'https://ssrkdc.ssrkedu.in',
  },
  {
    id: 'inst-ssrkjc',
    code: 'ssrkjc',
    slug: 'ssrk-junior-college',
    subdomain: 'ssrkjc',
    name: 'Sri Sai Rama Krishna Junior College (+2)',
    shortName: 'Junior College',
    description: 'Plus-two programs preparing students for higher education.',
    logoUrl: null,
    primaryColor: '#1e3a8a',
    coursesLine: '+2 Science · Arts · Commerce',
    programsLine: 'Science, Arts & Commerce streams',
    iconKey: 'junior-college',
    iconBackgroundColor: '#FFF8E1',
    iconStrokeColor: '#F57F17',
    sortOrder: 2,
    href: 'https://ssrkjc.ssrkedu.in',
  },
];
