import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { API_ROUTES, buildApiUrl } from '../../../../core/api/api.routes';
import { InstitutionSummaryDto } from './dtos/institution-summary.dto';
import { MOCK_INSTITUTIONS } from './mock/institutions.mock';

@Injectable({ providedIn: 'root' })
export class InstitutionsApiService {
  getInstitutions(): Observable<InstitutionSummaryDto[]> {
    // TODO: GET buildApiUrl(API_ROUTES.public.institutions.list)
    return of(MOCK_INSTITUTIONS).pipe(delay(100));
  }

  /** Reserved for backend integration — documents the future list contract. */
  readonly listEndpoint = buildApiUrl(API_ROUTES.public.institutions.list);
}
