import { EnquiryFormOption } from '@ssrk/shared/ui';
import { InstitutionSummaryDto } from '../../institutions/api/dtos/institution-summary.dto';

export function mapInstitutionsToEnquiryCollegeOptions(
  institutions: InstitutionSummaryDto[],
): EnquiryFormOption[] {
  return institutions.map((institution) => ({
    label: institution.name,
    value: institution.code,
  }));
}
