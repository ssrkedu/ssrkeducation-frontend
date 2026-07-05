import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import {
  CmsInstitutionContext,
  CmsSection,
} from '../../../models/course.model';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminPermissionBannerComponent } from '../../../shared/components/admin-permission-banner/admin-permission-banner.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

@Component({
  selector: 'app-cms-courses-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    TableModule,
    Button,
    SelectButton,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    AdminPageHeaderComponent,
    AdminPermissionBannerComponent,
    AdminStatusBadgeComponent,
  ],
  templateUrl: './cms-courses-page.component.html',
})
export class CmsCoursesPageComponent {
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly auth = inject(AuthService);

  protected readonly courses = this.demoData.courses;
  protected readonly institutionContext = signal<CmsInstitutionContext>('dc');
  protected readonly activeSection = signal<CmsSection>('courses');

  protected readonly institutionOptions: { id: CmsInstitutionContext; label: string }[] = [
    { id: 'ssrk', label: 'SSRK Edu (Parent)' },
    { id: 'dc', label: 'SSRK Degree College' },
    { id: 'jc', label: 'SSRK Junior College' },
  ];

  protected readonly sectionOptions: { id: CmsSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'seo', label: 'SEO' },
  ];

  protected setInstitution(id: CmsInstitutionContext): void {
    this.institutionContext.set(id);
  }

  protected setSection(id: CmsSection | string | number | undefined): void {
    if (typeof id === 'string') {
      this.activeSection.set(id as CmsSection);
    }
  }

  protected sectionLabel(id: CmsSection): string {
    return this.sectionOptions.find((item) => item.id === id)?.label ?? 'Section';
  }
}
