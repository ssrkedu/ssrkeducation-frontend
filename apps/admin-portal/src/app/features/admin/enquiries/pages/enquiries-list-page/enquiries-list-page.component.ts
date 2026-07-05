import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import { EnquiryFilters } from '../../../models/enquiry.model';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminPermissionBannerComponent } from '../../../shared/components/admin-permission-banner/admin-permission-banner.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

@Component({
  selector: 'app-enquiries-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    TableModule,
    Button,
    Select,
    IconField,
    InputIcon,
    InputText,
    AdminPageHeaderComponent,
    AdminPermissionBannerComponent,
    AdminStatusBadgeComponent,
  ],
  templateUrl: './enquiries-list-page.component.html',
})
export class EnquiriesListPageComponent {
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly auth = inject(AuthService);

  protected readonly filters = signal<EnquiryFilters>({
    status: '',
    institution: '',
    course: '',
    search: '',
  });

  protected readonly statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'New', value: 'New' },
    { label: 'Reviewed', value: 'Reviewed' },
  ];

  protected readonly institutionOptions = [
    { label: 'All Institutions', value: '' },
    { label: 'Degree College', value: 'Degree College' },
    { label: 'Junior College', value: 'Junior College' },
  ];

  protected readonly courseOptions = [
    { label: 'All Courses', value: '' },
    { label: 'B.Com', value: 'B.Com' },
    { label: 'BCA', value: 'BCA' },
    { label: 'B.Sc', value: 'B.Sc' },
    { label: 'B.A', value: 'B.A' },
    { label: 'D.Pharm', value: 'D.Pharm' },
    { label: 'BBA', value: 'BBA' },
    { label: 'Commerce', value: 'Commerce' },
  ];

  protected readonly filteredEnquiries = computed(() =>
    this.demoData.filterEnquiries(this.filters()),
  );

  protected readonly resultSummary = computed(() => {
    const filtered = this.filteredEnquiries().length;
    const total = this.demoData.enquiries().length;
    return `Showing ${filtered} of ${total} enquiries`;
  });

  protected updateFilter<K extends keyof EnquiryFilters>(key: K, value: EnquiryFilters[K]): void {
    this.filters.update((current) => ({ ...current, [key]: value }));
  }

  protected clearFilters(): void {
    this.filters.set({ status: '', institution: '', course: '', search: '' });
  }

  protected exportData(): void {
    window.alert('CSV export triggered for current filter context. (demo)');
  }
}
