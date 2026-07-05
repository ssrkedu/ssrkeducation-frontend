import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

@Component({
  selector: 'app-users-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TableModule, Button, AdminPageHeaderComponent, AdminStatusBadgeComponent],
  templateUrl: './users-list-page.component.html',
})
export class UsersListPageComponent {
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly users = this.demoData.users;

  protected permissionsLabel(permissions: readonly string[], role: string): string {
    if (role === 'super_admin') return 'All access';
    return permissions.map((item) => item.replace('_management', '')).join(', ') || 'None';
  }
}
