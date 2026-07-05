import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../../../../core/auth/auth.service';

@Component({
  selector: 'app-admin-header-user-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'shrink-0' },
  imports: [Button, Menu],
  templateUrl: './admin-header-user-menu.component.html',
})
export class AdminHeaderUserMenuComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly userMenu = viewChild.required<Menu>('userMenu');

  protected readonly currentUser = this.auth.currentUser;

  protected readonly roleLabel = computed(() => {
    const user = this.currentUser();
    if (!user) return 'Guest';
    return user.role === 'super_admin' ? 'Super Admin' : 'Admin';
  });

  protected readonly displayName = computed(
    () => this.currentUser()?.name ?? 'Guest User',
  );

  protected readonly menuItems = computed<MenuItem[]>(() => [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => {
        void this.router.navigateByUrl('/settings');
      },
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ]);

  protected toggleMenu(event: Event): void {
    this.userMenu().toggle(event);
  }

  private logout(): void {
    this.auth.signOut();
    void this.router.navigateByUrl('/auth/login');
  }
}
