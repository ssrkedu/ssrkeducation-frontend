import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

@Component({
  selector: 'app-users-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    TableModule,
    Button,
    Avatar,
    IconField,
    InputIcon,
    InputText,
    AdminPageHeaderComponent,
    AdminStatusBadgeComponent,
  ],
  templateUrl: './users-list-page.component.html',
})
export class UsersListPageComponent {
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly search = signal('');

  protected readonly users = computed(() => {
    const query = this.search().trim().toLowerCase();
    const items = this.demoData.users();

    if (!query) return items;

    return items.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query),
    );
  });

  protected permissionsLabel(permissions: readonly string[], role: string): string {
    if (role === 'super_admin') return 'All access';
    return permissions.map((item) => item.replace('_management', '')).join(', ') || 'None';
  }
}
