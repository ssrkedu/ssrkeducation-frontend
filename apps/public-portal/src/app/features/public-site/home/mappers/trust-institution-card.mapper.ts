import { resolveInstitutionSiteUrl } from '../../../../core/site-context/public-site-url.utils';
import { InstitutionSummaryDto } from '../../institutions/api/dtos/institution-summary.dto';
import { TrustHomeInstitutionsSectionVm } from '../models/trust-home-institutions-section.vm';
import {
  TrustInstitutionCardPresentationVm,
  TrustInstitutionCardVm,
  TrustInstitutionIconVm,
  TrustInstitutionsSectionContentVm,
} from '../models/trust-institution-card.vm';

export function mapInstitutionsToTrustSectionContentVm(
  institutions: InstitutionSummaryDto[],
  sectionCopy: TrustHomeInstitutionsSectionVm,
): TrustInstitutionsSectionContentVm {
  const cards = institutions
    .map((institution) => mapInstitutionToTrustCardVm(institution))
    .filter((card): card is TrustInstitutionCardVm => card !== null);

  return {
    ...sectionCopy,
    cards,
  };
}

export function mapInstitutionToCardPresentationVm(
  institution: InstitutionSummaryDto,
): TrustInstitutionCardPresentationVm {
  return {
    coursesLine: institution.coursesLine ?? '',
    programsLine: institution.programsLine ?? undefined,
    icon: mapIconKeyVm(institution.iconKey),
    iconBackgroundColor: institution.iconBackgroundColor ?? '#EAF4FB',
    iconStrokeColor: institution.iconStrokeColor ?? '#1A5276',
    tenantKey: institution.subdomain,
  };
}

function mapInstitutionToTrustCardVm(
  institution: InstitutionSummaryDto,
): TrustInstitutionCardVm | null {
  return {
    name: institution.name,
    coursesLine: institution.coursesLine ?? '',
    programsLine: institution.programsLine ?? undefined,
    href: resolveInstitutionHref(institution),
    icon: mapIconKeyVm(institution.iconKey),
    iconBackgroundColor: institution.iconBackgroundColor ?? '#EAF4FB',
    iconStrokeColor: institution.iconStrokeColor ?? '#1A5276',
  };
}

function mapIconKeyVm(iconKey: string | null): TrustInstitutionIconVm {
  return iconKey === 'junior-college' ? 'junior-college' : 'degree';
}

function resolveInstitutionHref(institution: InstitutionSummaryDto): string {
  return resolveInstitutionSiteUrl(institution.subdomain);
}
