import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CourseItemDto,
  ScholarshipItemDto,
} from '../../../../core/public-api/dtos/public-api.dtos';
import { ApiLanguageCode } from '../../../../core/public-api/language-code.util';
import { PublicApiClient } from '../../../../core/public-api/public-api.client';

@Injectable({ providedIn: 'root' })
export class InstitutionCatalogApiService {
  private readonly api = inject(PublicApiClient);

  getCourses(
    tenantKey: string,
    lang: ApiLanguageCode,
  ): Observable<CourseItemDto[]> {
    return this.api
      .getCourses(tenantKey, lang)
      .pipe(map((response) => response.items));
  }

  getScholarships(
    tenantKey: string,
    lang: ApiLanguageCode,
  ): Observable<ScholarshipItemDto[]> {
    return this.api
      .getScholarships(tenantKey, lang)
      .pipe(map((response) => response.items));
  }
}
