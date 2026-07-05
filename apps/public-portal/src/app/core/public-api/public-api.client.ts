import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { map, Observable, tap } from 'rxjs';
import {
  CreateEnquiryRequestDto,
  CreateEnquiryResponseDto,
  CoursesListDto,
  InstitutionsListDto,
  InterestTopicsListDto,
  PageContentDto,
  ResolveSiteDto,
  ScholarshipsListDto,
} from './dtos/public-api.dtos';
import { logLanguageFallback } from './language-fallback.util';
import { ApiLanguageCode } from './language-code.util';
import {
  buildPublicApiUrl,
  PUBLIC_API_ROUTES,
} from './public-api.routes';

@Injectable({ providedIn: 'root' })
export class PublicApiClient {
  private readonly http = inject(HttpClient);

  resolveSite(host: string, lang: ApiLanguageCode): Observable<ResolveSiteDto> {
    const params = new HttpParams().set('host', host).set('lang', lang);

    return this.http
      .get<ApiResponse<ResolveSiteDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.sites.resolve),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback('sites/resolve', data.language),
        ),
      );
  }

  getPageContent(
    tenantKey: string,
    pageKey: string,
    lang: ApiLanguageCode,
  ): Observable<PageContentDto> {
    const params = new HttpParams().set('lang', lang);

    return this.http
      .get<ApiResponse<PageContentDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.sites.page(tenantKey, pageKey)),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback(`sites/${tenantKey}/pages/${pageKey}`, data.language),
        ),
      );
  }

  getInstitutions(
    tenantKey: string,
    lang: ApiLanguageCode,
  ): Observable<InstitutionsListDto> {
    const params = new HttpParams().set('lang', lang);

    return this.http
      .get<ApiResponse<InstitutionsListDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.sites.institutions(tenantKey)),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback(`sites/${tenantKey}/institutions`, data.language),
        ),
      );
  }

  getCourses(
    tenantKey: string,
    lang: ApiLanguageCode,
  ): Observable<CoursesListDto> {
    const params = new HttpParams().set('lang', lang);

    return this.http
      .get<ApiResponse<CoursesListDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.sites.courses(tenantKey)),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback(`sites/${tenantKey}/courses`, data.language),
        ),
      );
  }

  getScholarships(
    tenantKey: string,
    lang: ApiLanguageCode,
    courseSlug?: string,
  ): Observable<ScholarshipsListDto> {
    let params = new HttpParams().set('lang', lang);

    if (courseSlug) {
      params = params.set('courseSlug', courseSlug);
    }

    return this.http
      .get<ApiResponse<ScholarshipsListDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.sites.scholarships(tenantKey)),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback(`sites/${tenantKey}/scholarships`, data.language),
        ),
      );
  }

  getInterestTopics(lang: ApiLanguageCode): Observable<InterestTopicsListDto> {
    const params = new HttpParams().set('lang', lang);

    return this.http
      .get<ApiResponse<InterestTopicsListDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.enquiries.interestTopics),
        { params },
      )
      .pipe(
        map((response) => unwrapApiResponse(response)),
        tap((data) =>
          logLanguageFallback('enquiry-interest-topics', data.language),
        ),
      );
  }

  submitEnquiry(
    request: CreateEnquiryRequestDto,
  ): Observable<CreateEnquiryResponseDto> {
    return this.http
      .post<ApiResponse<CreateEnquiryResponseDto>>(
        buildPublicApiUrl(PUBLIC_API_ROUTES.enquiries.submit),
        request,
      )
      .pipe(map((response) => unwrapApiResponse(response)));
  }
}
