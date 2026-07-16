import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, map } from 'rxjs';
import { API_ROUTES } from '../../../../core/api/api.routes';
import { buildApiUrl } from '../../../../core/api/build-api-url';
import {
  CreateCmsCourseRequest,
  SetCmsCourseStatusRequest,
  SetCmsInstitutionStatusRequest,
  SetCmsSectionStatusRequest,
  SetCmsScholarshipStatusRequest,
  UpdateCmsCourseRequest,
  UpdateCmsInstitutionRequest,
  UpdateCmsPageSeoRequest,
  UpdateCmsScholarshipRequest,
  CreateCmsScholarshipRequest,
  UpdateCmsTrustSectionRequest,
  UpdateCmsTrustSiteRequest,
} from './requests/cms.requests';
import {
  CmsCourseDetailDto,
  CmsCourseListItemDto,
  CmsInstitutionDetailDto,
  CmsInstitutionDto,
  CmsScholarshipDetailDto,
  CmsScholarshipListItemDto,
  CmsTrustPageDto,
  CmsTrustSectionDto,
  CmsTrustSiteDto,
} from './dtos/cms.dto';

@Injectable({ providedIn: 'root' })
export class CmsApiService {
  private readonly http = inject(HttpClient);

  listInstitutions(): Observable<CmsInstitutionDto[]> {
    return this.http
      .get<ApiResponse<CmsInstitutionDto[]>>(
        buildApiUrl(API_ROUTES.admin.cms.institutions),
      )
      .pipe(map(unwrapApiResponse));
  }

  getInstitutionDetail(id: string): Observable<CmsInstitutionDetailDto> {
    return this.http
      .get<ApiResponse<CmsInstitutionDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionDetail, { id }),
      )
      .pipe(map(unwrapApiResponse));
  }

  updateInstitution(
    id: string,
    request: UpdateCmsInstitutionRequest,
  ): Observable<CmsInstitutionDetailDto> {
    return this.http
      .put<ApiResponse<CmsInstitutionDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionDetail, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setInstitutionStatus(
    id: string,
    request: SetCmsInstitutionStatusRequest,
  ): Observable<CmsInstitutionDetailDto> {
    return this.http
      .put<ApiResponse<CmsInstitutionDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionStatus, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  listCourses(institutionId: string): Observable<CmsCourseListItemDto[]> {
    return this.http
      .get<ApiResponse<CmsCourseListItemDto[]>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionCourses, { institutionId }),
      )
      .pipe(map(unwrapApiResponse));
  }

  getCourseById(id: string): Observable<CmsCourseDetailDto> {
    return this.http
      .get<ApiResponse<CmsCourseDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.courseDetail, { id }),
      )
      .pipe(map(unwrapApiResponse));
  }

  getCourseBySlug(institutionId: string, slug: string): Observable<CmsCourseDetailDto> {
    return this.http
      .get<ApiResponse<CmsCourseDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.courseBySlug, { institutionId, slug }),
      )
      .pipe(map(unwrapApiResponse));
  }

  createCourse(
    institutionId: string,
    request: CreateCmsCourseRequest,
  ): Observable<CmsCourseDetailDto> {
    return this.http
      .post<ApiResponse<CmsCourseDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionCourses, { institutionId }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  updateCourse(id: string, request: UpdateCmsCourseRequest): Observable<CmsCourseDetailDto> {
    return this.http
      .put<ApiResponse<CmsCourseDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.courseDetail, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setCourseStatus(id: string, request: SetCmsCourseStatusRequest): Observable<CmsCourseDetailDto> {
    return this.http
      .put<ApiResponse<CmsCourseDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.courseStatus, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  getTrustSite(): Observable<CmsTrustSiteDto> {
    return this.http
      .get<ApiResponse<CmsTrustSiteDto>>(buildApiUrl(API_ROUTES.admin.cms.trustSite))
      .pipe(map(unwrapApiResponse));
  }

  updateTrustSite(request: UpdateCmsTrustSiteRequest): Observable<CmsTrustSiteDto> {
    return this.http
      .put<ApiResponse<CmsTrustSiteDto>>(buildApiUrl(API_ROUTES.admin.cms.trustSite), request)
      .pipe(map(unwrapApiResponse));
  }

  getTrustPage(pageKey: string): Observable<CmsTrustPageDto> {
    return this.http
      .get<ApiResponse<CmsTrustPageDto>>(
        buildApiUrl(API_ROUTES.admin.cms.trustPage, { pageKey }),
      )
      .pipe(map(unwrapApiResponse));
  }

  updateTrustPageSeo(
    pageKey: string,
    request: UpdateCmsPageSeoRequest,
  ): Observable<CmsTrustPageDto> {
    return this.http
      .put<ApiResponse<CmsTrustPageDto>>(
        buildApiUrl(API_ROUTES.admin.cms.trustPageSeo, { pageKey }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  getTrustSection(pageKey: string, sectionKey: string): Observable<CmsTrustSectionDto> {
    return this.http
      .get<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.trustSection, { pageKey, sectionKey }),
      )
      .pipe(map(unwrapApiResponse));
  }

  updateTrustSection(
    pageKey: string,
    sectionKey: string,
    request: UpdateCmsTrustSectionRequest,
  ): Observable<CmsTrustSectionDto> {
    return this.http
      .put<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.trustSection, { pageKey, sectionKey }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setTrustSectionStatus(
    pageKey: string,
    sectionKey: string,
    request: SetCmsSectionStatusRequest,
  ): Observable<CmsTrustSectionDto> {
    return this.http
      .put<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.trustSectionStatus, { pageKey, sectionKey }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  getInstitutionPage(institutionId: string, pageKey: string): Observable<CmsTrustPageDto> {
    return this.http
      .get<ApiResponse<CmsTrustPageDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionPage, { institutionId, pageKey }),
      )
      .pipe(map(unwrapApiResponse));
  }

  getInstitutionSection(
    institutionId: string,
    pageKey: string,
    sectionKey: string,
  ): Observable<CmsTrustSectionDto> {
    return this.http
      .get<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionSection, {
          institutionId,
          pageKey,
          sectionKey,
        }),
      )
      .pipe(map(unwrapApiResponse));
  }

  updateInstitutionSection(
    institutionId: string,
    pageKey: string,
    sectionKey: string,
    request: UpdateCmsTrustSectionRequest,
  ): Observable<CmsTrustSectionDto> {
    return this.http
      .put<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionSection, {
          institutionId,
          pageKey,
          sectionKey,
        }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setInstitutionSectionStatus(
    institutionId: string,
    pageKey: string,
    sectionKey: string,
    request: SetCmsSectionStatusRequest,
  ): Observable<CmsTrustSectionDto> {
    return this.http
      .put<ApiResponse<CmsTrustSectionDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionSectionStatus, {
          institutionId,
          pageKey,
          sectionKey,
        }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  listScholarships(institutionId: string): Observable<CmsScholarshipListItemDto[]> {
    return this.http
      .get<ApiResponse<CmsScholarshipListItemDto[]>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionScholarships, { institutionId }),
      )
      .pipe(map(unwrapApiResponse));
  }

  getScholarshipBySlug(
    institutionId: string,
    slug: string,
  ): Observable<CmsScholarshipDetailDto> {
    return this.http
      .get<ApiResponse<CmsScholarshipDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.scholarshipBySlug, { institutionId, slug }),
      )
      .pipe(map(unwrapApiResponse));
  }

  createScholarship(
    institutionId: string,
    request: CreateCmsScholarshipRequest,
  ): Observable<CmsScholarshipDetailDto> {
    return this.http
      .post<ApiResponse<CmsScholarshipDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.institutionScholarships, { institutionId }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  updateScholarship(
    id: string,
    request: UpdateCmsScholarshipRequest,
  ): Observable<CmsScholarshipDetailDto> {
    return this.http
      .put<ApiResponse<CmsScholarshipDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.scholarshipDetail, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setScholarshipStatus(
    id: string,
    request: SetCmsScholarshipStatusRequest,
  ): Observable<CmsScholarshipDetailDto> {
    return this.http
      .put<ApiResponse<CmsScholarshipDetailDto>>(
        buildApiUrl(API_ROUTES.admin.cms.scholarshipStatus, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }
}
