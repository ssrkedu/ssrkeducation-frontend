import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, map } from 'rxjs';
import { API_ROUTES } from '../../../../core/api/api.routes';
import { buildApiUrl } from '../../../../core/api/build-api-url';
import { DashboardSummaryDto } from './dtos/dashboard.dto';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<DashboardSummaryDto> {
    return this.http
      .get<ApiResponse<DashboardSummaryDto>>(
        buildApiUrl(API_ROUTES.admin.dashboard.summary),
      )
      .pipe(map(unwrapApiResponse));
  }
}
