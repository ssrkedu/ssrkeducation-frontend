import { formatAdminDateTime } from '../../shared/utils/format-admin-date.util';
import { AdminUserDetailDto, AdminUserListItemDto } from '../api/dtos/user.dto';
import { ManagedUserDetailVm, ManagedUserListItemVm } from '../models/managed-user.model';

function buildInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function mapAdminUserListItemDtoToVm(dto: AdminUserListItemDto): ManagedUserListItemVm {
  return {
    id: dto.id,
    name: dto.fullName,
    initials: buildInitials(dto.fullName),
    email: dto.email,
    role: dto.isSuperAdmin ? 'super_admin' : 'admin',
    permissions: dto.permissions,
    active: dto.isActive,
    lastLogin: formatAdminDateTime(dto.lastLoginAtUtc),
  };
}

export function mapAdminUserDetailDtoToVm(dto: AdminUserDetailDto): ManagedUserDetailVm {
  return {
    ...mapAdminUserListItemDtoToVm(dto),
    authMethod: dto.authMethod,
    isSuperAdmin: dto.isSuperAdmin,
    createdAtUtc: dto.createdAtUtc,
  };
}
