import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import { DashboardApiService } from '../../api/dashboard-api.service';
import {
  DashboardSummaryVm,
  mapDashboardSummaryDtoToVm,
} from '../../mappers/dashboard.mapper';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';
import { formatTodayLabel } from '../../../shared/utils/format-admin-date.util';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TableModule,
    Button,
    Card,
    ProgressBar,
    AdminPageHeaderComponent,
    AdminStatusBadgeComponent,
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  private readonly dashboardApi = inject(DashboardApiService);
  protected readonly auth = inject(AuthService);

  protected readonly summary = signal<DashboardSummaryVm | null>(null);
  protected readonly todayLabel = formatTodayLabel();

  protected readonly stats = {
    newEnquiries: () => this.summary()?.newEnquiryCount ?? 0,
    totalEnquiries: () => this.summary()?.totalEnquiryCount ?? 0,
    publishedCourses: () => this.summary()?.publishedCourseCount ?? 0,
    activeUsers: () => this.summary()?.activeUserCount ?? 0,
  };

  protected readonly recentEnquiries = () => this.summary()?.recentEnquiries ?? [];
  protected readonly enquiriesByCourse = () => this.summary()?.enquiriesByCourse ?? [];

  constructor() {
    this.dashboardApi
      .getSummary()
      .pipe(takeUntilDestroyed())
      .subscribe((dto) => this.summary.set(mapDashboardSummaryDtoToVm(dto)));
  }
}
