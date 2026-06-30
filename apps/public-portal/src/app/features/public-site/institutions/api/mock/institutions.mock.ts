import { InstitutionSummaryDto } from '../dtos/institution-summary.dto';

/** Temporary mock until GET /api/public/institutions is available. */
export const MOCK_INSTITUTIONS: InstitutionSummaryDto[] = [
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
    name: 'SSRK Junior College (+2)',
    description: 'Plus-two programs preparing students for higher education.',
    logoUrl: null,
  },
];
