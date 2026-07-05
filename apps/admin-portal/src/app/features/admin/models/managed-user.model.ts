import { AdminPermission, AdminRole } from '../../../core/auth/auth.types';

export interface ManagedUser {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: AdminRole;
  permissions: readonly AdminPermission[];
  active: boolean;
  lastLogin: string;
}
