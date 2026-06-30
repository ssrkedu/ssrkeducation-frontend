import { buildTenantSiteUrl } from '../../../../core/site-context/public-site-url.utils';
import { InstitutionSummaryDto } from '../../institutions/api/dtos/institution-summary.dto';
import { TRUST_INSTITUTIONS_SECTION } from '../pages/trust-home-page/trust-institutions-section.config';

export type TrustInstitutionIcon = 'degree' | 'junior-college';

export interface TrustInstitutionCard {
  name: string;
  coursesLine: string;
  programsLine?: string;
  href: string;
  linkLabel?: string;
  icon: TrustInstitutionIcon;
  iconBackgroundColor: string;
  iconStrokeColor: string;
}

export interface TrustInstitutionsSectionContent {
  sectionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  cards: TrustInstitutionCard[];
}

interface TrustInstitutionCardPresentation {
  coursesLine: string;
  programsLine?: string;
  icon: TrustInstitutionIcon;
  iconBackgroundColor: string;
  iconStrokeColor: string;
  tenantKey: string;
}

const TRUST_HOME_INSTITUTION_CODES = ['ssrkdc', 'ssrkjc'] as const;

const PRESENTATION_BY_CODE: Record<
  (typeof TRUST_HOME_INSTITUTION_CODES)[number],
  TrustInstitutionCardPresentation
> = {
  ssrkdc: {
    coursesLine: 'BA · B.Sc · B.Com · MA · M.Sc · M.Com',
    programsLine: 'Arts, Science & Commerce streams',
    icon: 'degree',
    iconBackgroundColor: '#EAF4FB',
    iconStrokeColor: '#1A5276',
    tenantKey: 'ssrkdc',
  },
  ssrkjc: {
    coursesLine: '+2 Science · Arts · Commerce',
    programsLine: 'CHSE Odisha Affiliated · Day & Evening',
    icon: 'junior-college',
    iconBackgroundColor: '#FFF8E1',
    iconStrokeColor: '#F57F17',
    tenantKey: 'ssrkjc',
  },
};

export function mapInstitutionsToTrustSectionContent(
  institutions: InstitutionSummaryDto[],
): TrustInstitutionsSectionContent {
  const cards = TRUST_HOME_INSTITUTION_CODES.map((code) => {
    const institution = institutions.find((item) => item.code === code);
    if (!institution) {
      return null;
    }

    return mapInstitutionToTrustCard(institution);
  }).filter((card): card is TrustInstitutionCard => card !== null);

  return {
    ...TRUST_INSTITUTIONS_SECTION,
    cards,
  };
}

function mapInstitutionToTrustCard(
  institution: InstitutionSummaryDto,
): TrustInstitutionCard | null {
  const presentation =
    PRESENTATION_BY_CODE[
      institution.code as (typeof TRUST_HOME_INSTITUTION_CODES)[number]
    ];
  if (!presentation) {
    return null;
  }

  return {
    name: institution.name,
    coursesLine: presentation.coursesLine,
    programsLine: presentation.programsLine,
    href: buildTenantSiteUrl(presentation.tenantKey),
    icon: presentation.icon,
    iconBackgroundColor: presentation.iconBackgroundColor,
    iconStrokeColor: presentation.iconStrokeColor,
  };
}
