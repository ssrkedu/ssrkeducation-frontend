import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../../core/auth/auth.service';
import { Perm } from '../../../../../core/auth/permissions';

interface SidebarNavItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-admin-sidebar-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="flex-1 overflow-y-auto px-2 py-2">
      <ul class="m-0 list-none p-0">
        @for (item of navItems(); track item.routerLink) {
          <li>
            <a
              class="admin-sidebar-link"
              [routerLink]="item.routerLink"
              routerLinkActive="admin-sidebar-link-active"
              (click)="onNavigate()"
            >
              <i [class]="item.icon + ' admin-sidebar-link-icon'" aria-hidden="true"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class AdminSidebarNavComponent {
  private readonly auth = inject(AuthService);

  readonly navigate = output<void>();

  protected readonly navItems = computed<SidebarNavItem[]>(() => {
    const items: SidebarNavItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        routerLink: '/dashboard',
      },
      {
        label: 'Enquiry Management',
        icon: 'pi pi-comments',
        routerLink: '/enquiries',
      },
    ];

    if (this.auth.isSuperAdmin() || this.auth.hasPermission(Perm.Content.Read)) {
      items.push({
        label: 'Content Management',
        icon: 'pi pi-file',
        routerLink: '/cms',
      });
    }

    if (this.auth.canManageUsers()) {
      items.push({
        label: 'User Management',
        icon: 'pi pi-users',
        routerLink: '/users',
      });
    }

    return items;
  });

  protected onNavigate(): void {
    this.navigate.emit();
  }
}
