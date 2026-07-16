import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import {
  EnquiriesApiService,
  EnquiryLookupsApiService,
} from '../../api/enquiries-api.service';
import { mapEnquiryListItemDtoToVm } from '../../mappers/enquiry.mapper';
import {
  EnquiryFilters,
  EnquiryListItemVm,
  LookupOptionVm,
} from '../../models/enquiry.model';
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
  private readonly enquiriesApi = inject(EnquiriesApiService);
  private readonly lookupsApi = inject(EnquiryLookupsApiService);
  protected readonly auth = inject(AuthService);

  protected readonly filters = signal<EnquiryFilters>({
    status: '',
    institutionId: '',
    courseId: '',
    search: '',
  });

  protected readonly enquiries = signal<EnquiryListItemVm[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly loading = signal(false);
  private readonly tableFirst = signal(0);

  protected readonly institutionOptions = signal<LookupOptionVm[]>([
    { label: 'All Institutions', value: '' },
  ]);
  protected readonly courseOptions = signal<LookupOptionVm[]>([
    { label: 'All Courses', value: '' },
  ]);

  protected readonly statusOptions = [
    { label: 'All Status', value: '' },
    { label: 'New', value: 'New' },
    { label: 'Reviewed', value: 'Reviewed' },
  ];

  protected readonly resultSummary = computed(() => {
    const visible = this.enquiries().length;
    const total = this.totalCount();
    return `Showing ${visible} of ${total} enquiries`;
  });

  constructor() {
    this.lookupsApi
      .listInstitutions()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => {
        this.institutionOptions.set([
          { label: 'All Institutions', value: '' },
          ...items.map((item) => ({ label: item.name, value: item.id })),
        ]);
      });

    this.lookupsApi
      .listCourses()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => {
        this.courseOptions.set([
          { label: 'All Courses', value: '' },
          ...items.map((item) => ({ label: item.name, value: item.id })),
        ]);
      });
  }

  protected updateFilter<K extends keyof EnquiryFilters>(
    key: K,
    value: EnquiryFilters[K],
  ): void {
    this.filters.update((current) => ({ ...current, [key]: value }));
    this.tableFirst.set(0);
    this.loadPage(1, this.pageSize());
  }

  protected clearFilters(): void {
    this.filters.set({
      status: '',
      institutionId: '',
      courseId: '',
      search: '',
    });
    this.tableFirst.set(0);
    this.loadPage(1, this.pageSize());
  }

  protected onLazyLoad(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? this.pageSize();
    const first = event.first ?? 0;
    const page = Math.floor(first / rows) + 1;
    this.pageSize.set(rows);
    this.tableFirst.set(first);
    this.loadPage(page, rows);
  }

  protected exportData(): void {
    const filters = this.filters();
    this.enquiriesApi
      .exportCsv({
        status: filters.status || undefined,
        institutionId: filters.institutionId || undefined,
        courseId: filters.courseId || undefined,
        search: filters.search || undefined,
      })
      .subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'enquiries.csv';
        anchor.click();
        URL.revokeObjectURL(url);
      });
  }

  private loadPage(page: number, pageSize: number): void {
    this.loading.set(true);
    const filters = this.filters();

    this.enquiriesApi
      .search({
        status: filters.status || undefined,
        institutionId: filters.institutionId || undefined,
        courseId: filters.courseId || undefined,
        search: filters.search || undefined,
        page,
        pageSize,
      })
      .subscribe({
        next: (result) => {
          this.enquiries.set(result.items.map(mapEnquiryListItemDtoToVm));
          this.totalCount.set(result.totalCount);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
