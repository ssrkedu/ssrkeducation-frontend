export type AdminRole = 'super_admin' | 'admin';

export type AdminPermission = 'content_management' | 'enquiry_management';

export interface AdminUser {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: AdminRole;
  permissions: readonly AdminPermission[];
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
