import { Injectable, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminUser, LoginFormModel, ProfileSettingsFormModel } from './auth.types';

const DEMO_USERS: readonly AdminUser[] = [
  {
    id: 1,
    name: 'Vikram Sharma',
    initials: 'VS',
    email: 'vikram@ssrkedu.com',
    role: 'super_admin',
    permissions: ['content_management', 'enquiry_management'],
  },
  {
    id: 2,
    name: 'Sunita Patra',
    initials: 'SP',
    email: 'sunita@ssrkedu.com',
    role: 'admin',
    permissions: ['enquiry_management'],
  },
  {
    id: 3,
    name: 'Meera Das',
    initials: 'MD',
    email: 'meera@ssrkedu.com',
    role: 'admin',
    permissions: ['content_management'],
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AdminUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  readonly isSuperAdmin = computed(
    () => this.currentUser()?.role === 'super_admin',
  );

  hasPermission(permission: AdminUser['permissions'][number]): boolean {
    const user = this.currentUser();
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return user.permissions.includes(permission);
  }

  canWriteEnquiries(): boolean {
    return this.hasPermission('enquiry_management');
  }

  canWriteCms(): boolean {
    return this.hasPermission('content_management');
  }

  login(credentials: LoginFormModel): Observable<AdminUser> {
    const email = credentials.email.trim().toLowerCase();
    const user =
      DEMO_USERS.find((candidate) => candidate.email === email) ?? DEMO_USERS[0];

    this.currentUser.set(user);
    return of(user);
  }

  signOut(): void {
    this.currentUser.set(null);
  }

  updateProfile(profile: ProfileSettingsFormModel): void {
    const user = this.currentUser();
    if (!user) return;

    const name = profile.name.trim();
    const email = profile.email.trim().toLowerCase();
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 2);

    this.currentUser.set({
      ...user,
      name,
      email,
      initials: initials || user.initials,
    });
  }
}
