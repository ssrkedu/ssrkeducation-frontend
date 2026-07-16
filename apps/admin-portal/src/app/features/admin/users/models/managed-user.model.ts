export interface ManagedUserListItemVm {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: 'super_admin' | 'admin';
  permissions: readonly string[];
  active: boolean;
  lastLogin: string;
}

export interface ManagedUserDetailVm extends ManagedUserListItemVm {
  authMethod: string;
  isSuperAdmin: boolean;
  createdAtUtc: string;
}
