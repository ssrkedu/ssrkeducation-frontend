import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TableModule,
    Button,
    AdminPageHeaderComponent,
    AdminStatusBadgeComponent,
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly auth = inject(AuthService);

  protected readonly stats = {
    newEnquiries: this.demoData.newEnquiryCount,
    totalEnquiries: this.demoData.totalEnquiryCount,
    publishedCourses: this.demoData.publishedCourseCount,
    activeUsers: this.demoData.activeUserCount,
  };

  protected readonly recentEnquiries = this.demoData.recentEnquiries;
  protected readonly enquiriesByCourse = this.demoData.enquiriesByCourse;
  protected readonly todayLabel = 'June 27, 2026';
}
