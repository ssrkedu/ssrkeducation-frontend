import { AdminUser, AdminUserProfileResponse, SuperAdminType } from './auth.types';

export function mapApiUser(profile: AdminUserProfileResponse): AdminUser {
  const name = profile.fullName.trim();

  return {
    id: profile.id,
    email: profile.email,
    name,
    initials: buildInitials(name),
    isSuperAdmin: profile.isSuperAdmin,
    superAdminType: normalizeSuperAdminType(profile.superAdminType),
    permissions: profile.permissions,
  };
}

function normalizeSuperAdminType(value: string | null): SuperAdminType | null {
  if (value === 'Owner' || value === 'Developer') {
    return value;
  }

  return null;
}

function buildInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2);
}
