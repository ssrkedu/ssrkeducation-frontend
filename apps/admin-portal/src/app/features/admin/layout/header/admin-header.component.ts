import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { AuthService } from '../../../../core/auth/auth.service';
import { Perm } from '../../../../core/auth/permissions';
import { DashboardApiService } from '../../dashboard/api/dashboard-api.service';
import { AdminHeaderUserMenuComponent } from '../components/admin-header-user-menu/admin-header-user-menu.component';

@Component({
  selector: 'app-admin-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, AdminHeaderUserMenuComponent],
  templateUrl: './admin-header.component.html',
})
export class AdminHeaderComponent {
  private readonly dashboardApi = inject(DashboardApiService);
  private readonly auth = inject(AuthService);

  readonly menuToggle = output<void>();

  protected readonly newEnquiryCount = signal(0);

  constructor() {
    if (this.auth.hasPermission(Perm.Enquiry.Read)) {
      this.dashboardApi
        .getSummary()
        .pipe(takeUntilDestroyed())
        .subscribe((summary) => this.newEnquiryCount.set(summary.newEnquiryCount));
    }
  }

  protected onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
