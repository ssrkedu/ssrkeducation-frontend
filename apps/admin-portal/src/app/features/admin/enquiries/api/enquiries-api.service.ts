import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, map } from 'rxjs';
import { API_ROUTES } from '../../../../core/api/api.routes';
import { buildHttpParams } from '../../../../core/api/build-http-params.util';
import { buildApiUrl } from '../../../../core/api/build-api-url';
import {
  CourseLookupDto,
  EnquiryDetailDto,
  EnquiryListResultDto,
  InstitutionLookupDto,
} from './dtos/enquiry.dto';
import {
  AddEnquiryNoteRequest,
  EnquirySearchCriteria,
  UpdateEnquiryStatusRequest,
} from './requests/enquiry.requests';

@Injectable({ providedIn: 'root' })
export class EnquiriesApiService {
  private readonly http = inject(HttpClient);

  search(criteria: EnquirySearchCriteria): Observable<EnquiryListResultDto> {
    return this.http
      .get<ApiResponse<EnquiryListResultDto>>(
        buildApiUrl(API_ROUTES.admin.enquiries.list),
        { params: buildHttpParams(criteria) },
      )
      .pipe(map(unwrapApiResponse));
  }

  getById(id: string): Observable<EnquiryDetailDto> {
    return this.http
      .get<ApiResponse<EnquiryDetailDto>>(
        buildApiUrl(API_ROUTES.admin.enquiries.detail, { id }),
      )
      .pipe(map(unwrapApiResponse));
  }

  updateStatus(id: string, request: UpdateEnquiryStatusRequest): Observable<EnquiryDetailDto> {
    return this.http
      .put<ApiResponse<EnquiryDetailDto>>(
        buildApiUrl(API_ROUTES.admin.enquiries.status, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  addNote(id: string, request: AddEnquiryNoteRequest): Observable<EnquiryDetailDto> {
    return this.http
      .post<ApiResponse<EnquiryDetailDto>>(
        buildApiUrl(API_ROUTES.admin.enquiries.notes, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  exportCsv(criteria: Omit<EnquirySearchCriteria, 'page' | 'pageSize'>): Observable<Blob> {
    return this.http.get(buildApiUrl(API_ROUTES.admin.enquiries.export), {
      params: buildHttpParams(criteria),
      responseType: 'blob',
    });
  }
}

@Injectable({ providedIn: 'root' })
export class EnquiryLookupsApiService {
  private readonly http = inject(HttpClient);

  listInstitutions(): Observable<InstitutionLookupDto[]> {
    return this.http
      .get<ApiResponse<InstitutionLookupDto[]>>(
        buildApiUrl(API_ROUTES.admin.lookups.institutions),
      )
      .pipe(map(unwrapApiResponse));
  }

  listCourses(institutionId?: string): Observable<CourseLookupDto[]> {
    return this.http
      .get<ApiResponse<CourseLookupDto[]>>(
        buildApiUrl(API_ROUTES.admin.lookups.courses),
        { params: buildHttpParams({ institutionId }) },
      )
      .pipe(map(unwrapApiResponse));
  }
}
