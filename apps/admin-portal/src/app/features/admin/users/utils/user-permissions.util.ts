import { Perm } from '../../../../core/auth/permissions';

export const CONTENT_PERMISSION_CODES = [
  Perm.Content.Read,
  Perm.Content.Write,
  Perm.Content.Publish,
] as const;

export const ENQUIRY_PERMISSION_CODES = [
  Perm.Enquiry.Read,
  Perm.Enquiry.Write,
  Perm.Enquiry.Export,
] as const;

export function hasAnyPermission(
  permissions: readonly string[],
  codes: readonly string[],
): boolean {
  return codes.some((code) => permissions.includes(code));
}

export function permissionsLabel(
  permissions: readonly string[],
  role: 'super_admin' | 'admin',
): string {
  if (role === 'super_admin') {
    return 'All access';
  }

  const labels: string[] = [];
  if (hasAnyPermission(permissions, CONTENT_PERMISSION_CODES)) {
    labels.push('Content');
  }
  if (hasAnyPermission(permissions, ENQUIRY_PERMISSION_CODES)) {
    labels.push('Enquiry');
  }
  if (permissions.includes(Perm.User.Read) || permissions.includes(Perm.User.Write)) {
    labels.push('Users');
  }
  if (permissions.includes(Perm.Dashboard.Read)) {
    labels.push('Dashboard');
  }

  return labels.join(', ') || 'None';
}

export function buildPermissionCodes(
  contentManagement: boolean,
  enquiryManagement: boolean,
): string[] {
  const codes: string[] = [];

  if (contentManagement) {
    codes.push(...CONTENT_PERMISSION_CODES);
  }
  if (enquiryManagement) {
    codes.push(...ENQUIRY_PERMISSION_CODES);
  }

  return codes;
}

export function readPermissionGroups(permissions: readonly string[]): {
  contentManagement: boolean;
  enquiryManagement: boolean;
} {
  return {
    contentManagement: hasAnyPermission(permissions, CONTENT_PERMISSION_CODES),
    enquiryManagement: hasAnyPermission(permissions, ENQUIRY_PERMISSION_CODES),
  };
}
