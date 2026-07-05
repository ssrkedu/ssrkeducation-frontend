import { InstitutionSummaryDto } from '../api/dtos/institution-summary.dto';

export type InstitutionsPageStatus = 'loading' | 'ready' | 'error';

export interface InstitutionsPageVm {
  status: InstitutionsPageStatus;
  errorMessage?: string;
  sectionLabel?: string;
  title?: string;
  description?: string;
  cardCtaLabel?: string;
  institutions?: InstitutionSummaryDto[];
}
