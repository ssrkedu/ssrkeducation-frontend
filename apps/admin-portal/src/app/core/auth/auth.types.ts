export type SuperAdminType = 'Owner' | 'Developer';

export interface AdminUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  isSuperAdmin: boolean;
  superAdminType: SuperAdminType | null;
  permissions: readonly string[];
}

export interface LoginFormModel {
  email: string;
  password: string;
}

export interface ForgotPasswordFormModel {
  email: string;
}

export interface ProfileSettingsFormModel {
  name: string;
  email: string;
}

export interface AdminUserProfileResponse {
  id: string;
  email: string;
  fullName: string;
  isSuperAdmin: boolean;
  superAdminType: string | null;
  permissions: readonly string[];
}

export interface AdminAuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAtUtc: string;
  refreshTokenExpiresAtUtc: string;
  user: AdminUserProfileResponse;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
