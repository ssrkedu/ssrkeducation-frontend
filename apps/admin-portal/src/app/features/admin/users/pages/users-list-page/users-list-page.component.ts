import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';
import { UsersApiService } from '../../api/users-api.service';
import { mapAdminUserListItemDtoToVm } from '../../mappers/user.mapper';
import { ManagedUserListItemVm } from '../../models/managed-user.model';
import { permissionsLabel } from '../../utils/user-permissions.util';

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
  private readonly usersApi = inject(UsersApiService);
  protected readonly search = signal('');
  protected readonly users = signal<ManagedUserListItemVm[]>([]);

  protected readonly filteredUsers = computed(() => {
    const query = this.search().trim().toLowerCase();
    const items = this.users();

    if (!query) return items;

    return items.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query),
    );
  });

  constructor() {
    this.usersApi
      .list()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => {
        this.users.set(items.map(mapAdminUserListItemDtoToVm));
      });
  }

  protected permissionsLabel = permissionsLabel;
}
