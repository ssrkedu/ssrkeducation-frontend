import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { buildApiUrl } from '../api/build-api-url';
import { API_ROUTES } from '../api/api.routes';
import { skipAuth } from './auth-context';
import { mapApiUser } from './auth.mapper';
import {
  AdminAuthTokensResponse,
  AdminUser,
  AdminUserProfileResponse,
  LoginFormModel,
  ProfileSettingsFormModel,
  TokenPair,
} from './auth.types';
import { Perm } from './permissions';
import { cancelInFlightRefresh } from './refresh.interceptor';
import { TokenStorage } from './token-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokens = inject(TokenStorage);
  private readonly router = inject(Router);

  readonly currentUser = signal<AdminUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isSuperAdmin = computed(() => this.currentUser()?.isSuperAdmin ?? false);

  hasPermission(permissionCode: string): boolean {
    const user = this.currentUser();
    if (!user) return false;
    if (user.isSuperAdmin) return true;
    return user.permissions.includes(permissionCode);
  }

  canWriteEnquiries(): boolean {
    return this.hasPermission(Perm.Enquiry.Write);
  }

  canWriteCms(): boolean {
    return this.hasPermission(Perm.Content.Write);
  }

  canPublishCms(): boolean {
    return this.hasPermission(Perm.Content.Publish);
  }

  canManageUsers(): boolean {
    return this.isSuperAdmin() || this.hasPermission(Perm.User.Read);
  }

  login(credentials: LoginFormModel): Observable<AdminUser> {
    return this.http
      .post<ApiResponse<AdminAuthTokensResponse>>(
        buildApiUrl(API_ROUTES.admin.auth.login),
        {
          email: credentials.email.trim(),
          password: credentials.password,
        },
        skipAuth(),
      )
      .pipe(
        map(unwrapApiResponse),
        tap((response) => this.applySession(response)),
        map((response) => mapApiUser(response.user)),
      );
  }

  refresh(): Observable<TokenPair> {
    const refreshToken = this.tokens.getRefresh();
    if (!refreshToken) {
      throw new Error('Refresh token is missing.');
    }

    return this.http
      .post<ApiResponse<AdminAuthTokensResponse>>(
        buildApiUrl(API_ROUTES.admin.auth.refresh),
        { refreshToken },
        skipAuth(),
      )
      .pipe(
        map(unwrapApiResponse),
        tap((response) => this.applySession(response)),
        map((response) => ({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })),
      );
  }

  logout(): Observable<void> {
    const refreshToken = this.tokens.getRefresh();
    if (!refreshToken) {
      this.hardLogout();
      return of(void 0);
    }

    return this.http
      .post<ApiResponse<void>>(
        buildApiUrl(API_ROUTES.admin.auth.logout),
        { refreshToken },
        skipAuth(),
      )
      .pipe(
        map(() => void 0),
        catchError(() => of(void 0)),
        finalize(() => this.hardLogout()),
      );
  }

  restoreSession(): Observable<AdminUser | null> {
    if (!this.tokens.getAccess()) {
      return of(null);
    }

    return this.http
      .get<ApiResponse<AdminUserProfileResponse>>(buildApiUrl(API_ROUTES.admin.auth.me))
      .pipe(
        map(unwrapApiResponse),
        tap((profile) => this.currentUser.set(mapApiUser(profile))),
        map((profile) => mapApiUser(profile)),
        catchError(() => {
          this.hardLogout();
          return of(null);
        }),
      );
  }

  hardLogout(): void {
    cancelInFlightRefresh();
    this.tokens.clear();
    this.currentUser.set(null);
    void this.router.navigateByUrl('/auth/login');
  }

  updateProfile(profile: ProfileSettingsFormModel): void {
    const user = this.currentUser();
    if (!user) return;

    const name = profile.name.trim();
    const email = profile.email.trim();
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 2);

    this.currentUser.set({
      ...user,
      name,
      email,
      initials: initials || user.initials,
    });
  }

  getRoleLabel(user: AdminUser | null): string {
    if (!user) return 'Guest';
    if (user.isSuperAdmin && user.superAdminType) {
      return `Super Admin · ${user.superAdminType}`;
    }
    if (user.isSuperAdmin) return 'Super Admin';
    return 'Admin';
  }

  private applySession(response: AdminAuthTokensResponse): void {
    this.tokens.setTokens(response.accessToken, response.refreshToken);
    this.currentUser.set(mapApiUser(response.user));
  }
}
