export interface AdminUserListItemDto {
  id: string;
  email: string;
  fullName: string;
  isSuperAdmin: boolean;
  superAdminType: string | null;
  isActive: boolean;
  authMethod: string;
  lastLoginAtUtc: string | null;
  permissions: string[];
}

export interface AdminUserDetailDto extends AdminUserListItemDto {
  createdAtUtc: string;
}
