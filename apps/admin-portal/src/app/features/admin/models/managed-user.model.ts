export interface ManagedUser {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: 'super_admin' | 'admin';
  permissions: readonly string[];
  active: boolean;
  lastLogin: string;
}
