export interface CreateAdminUserRequest {
  email: string;
  fullName: string;
  authMethod: 'password' | 'google';
  password?: string | null;
  permissionCodes: string[];
}

export interface UpdateAdminUserRequest {
  email: string;
  fullName: string;
}

export interface SetAdminUserPermissionsRequest {
  permissionCodes: string[];
}

export interface SetAdminUserStatusRequest {
  isActive: boolean;
}
