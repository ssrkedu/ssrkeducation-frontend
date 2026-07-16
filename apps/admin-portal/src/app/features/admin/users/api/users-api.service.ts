import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, map } from 'rxjs';
import { API_ROUTES } from '../../../../core/api/api.routes';
import { buildApiUrl } from '../../../../core/api/build-api-url';
import { AdminUserDetailDto, AdminUserListItemDto } from './dtos/user.dto';
import {
  CreateAdminUserRequest,
  SetAdminUserPermissionsRequest,
  SetAdminUserStatusRequest,
  UpdateAdminUserRequest,
} from './requests/user.requests';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);

  list(): Observable<AdminUserListItemDto[]> {
    return this.http
      .get<ApiResponse<AdminUserListItemDto[]>>(buildApiUrl(API_ROUTES.admin.users.list))
      .pipe(map(unwrapApiResponse));
  }

  getById(id: string): Observable<AdminUserDetailDto> {
    return this.http
      .get<ApiResponse<AdminUserDetailDto>>(
        buildApiUrl(API_ROUTES.admin.users.detail, { id }),
      )
      .pipe(map(unwrapApiResponse));
  }

  create(request: CreateAdminUserRequest): Observable<AdminUserDetailDto> {
    return this.http
      .post<ApiResponse<AdminUserDetailDto>>(
        buildApiUrl(API_ROUTES.admin.users.list),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  update(id: string, request: UpdateAdminUserRequest): Observable<AdminUserDetailDto> {
    return this.http
      .put<ApiResponse<AdminUserDetailDto>>(
        buildApiUrl(API_ROUTES.admin.users.detail, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setPermissions(
    id: string,
    request: SetAdminUserPermissionsRequest,
  ): Observable<AdminUserDetailDto> {
    return this.http
      .put<ApiResponse<AdminUserDetailDto>>(
        buildApiUrl(API_ROUTES.admin.users.permissions, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }

  setStatus(id: string, request: SetAdminUserStatusRequest): Observable<AdminUserDetailDto> {
    return this.http
      .put<ApiResponse<AdminUserDetailDto>>(
        buildApiUrl(API_ROUTES.admin.users.status, { id }),
        request,
      )
      .pipe(map(unwrapApiResponse));
  }
}
