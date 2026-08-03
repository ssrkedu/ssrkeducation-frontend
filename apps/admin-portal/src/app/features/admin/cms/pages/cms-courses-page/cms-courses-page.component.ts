import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsPageSectionSummaryDto, CmsScholarshipListItemDto, CmsTrustPageDto } from '../../api/dtos/cms.dto';
import { CmsContextService, CmsInstitutionTab } from '../../data/cms-context.service';
import {
  mapCmsCourseListItemDtoToVm,
  mapCmsInstitutionDtoToVm,
} from '../../mappers/course.mapper';
import { CmsInstitutionVm, CourseListItemVm } from '../../models/course.model';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';
import { AdminPermissionBannerComponent } from '../../../shared/components/admin-permission-banner/admin-permission-banner.component';
import { AdminStatusBadgeComponent } from '../../../shared/components/admin-status-badge/admin-status-badge.component';

type TrustTab = 'home' | 'chrome' | 'institutions' | 'registry' | 'seo' | 'branding';

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
  private readonly cmsApi = inject(CmsApiService);
  private readonly cmsContext = inject(CmsContextService);
  protected readonly auth = inject(AuthService);

  protected readonly institutions = signal<CmsInstitutionVm[]>([]);
  protected readonly courses = signal<CourseListItemVm[]>([]);
  protected readonly scholarships = signal<CmsScholarshipListItemDto[]>([]);
  protected readonly institutionHomePage = signal<CmsTrustPageDto | null>(null);
  protected readonly institutionChromePage = signal<CmsTrustPageDto | null>(null);
  protected readonly trustPage = signal<CmsTrustPageDto | null>(null);
  protected readonly trustTab = signal<TrustTab>('home');
  protected readonly loadError = signal<string | null>(null);
  protected readonly loadingHomeSections = signal(false);
  protected readonly loadingChromeSections = signal(false);
  protected readonly loadingCourses = signal(false);
  protected readonly loadingScholarships = signal(false);

  protected readonly isTrust = this.cmsContext.isTrust;
  protected readonly selectedInstitutionId = this.cmsContext.selectedInstitutionId;
  protected readonly institutionTab = this.cmsContext.institutionTab;

  protected readonly contextOptions = computed(() => [
    { id: 'trust', label: 'SSRK Edu (Parent)' },
    ...this.institutions().map((item) => ({ id: item.id, label: item.name })),
  ]);

  protected readonly selectedContextId = computed(() =>
    this.isTrust() ? 'trust' : (this.selectedInstitutionId() ?? 'trust'),
  );

  protected readonly trustTabs: { id: TrustTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'chrome', label: 'Chrome' },
    { id: 'institutions', label: 'Institutions Page' },
    { id: 'registry', label: 'Institution Registry' },
    { id: 'seo', label: 'SEO' },
    { id: 'branding', label: 'Branding' },
  ];

  protected readonly institutionTabs: { id: CmsInstitutionTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'chrome', label: 'Chrome' },
    { id: 'courses', label: 'Courses' },
    { id: 'scholarships', label: 'Scholarships' },
  ];

  protected readonly sectionRows = computed((): CmsPageSectionSummaryDto[] => {
    return this.trustPage()?.sections ?? [];
  });

  protected readonly institutionHomeSections = computed((): CmsPageSectionSummaryDto[] => {
    return this.institutionHomePage()?.sections ?? [];
  });

  protected readonly institutionChromeSections = computed((): CmsPageSectionSummaryDto[] => {
    return this.institutionChromePage()?.sections ?? [];
  });

  constructor() {
    this.cmsApi
      .listInstitutions()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (items) => {
          this.institutions.set(items.map(mapCmsInstitutionDtoToVm));
          this.restoreInstitutionContextIfNeeded();
        },
        error: () => {
          this.loadError.set('Unable to load institutions.');
        },
      });

    if (this.isTrust()) {
      this.loadTrustPage('home');
    }
  }

  protected setContext(id: string): void {
    if (id === 'trust') {
      this.cmsContext.selectTrust();
      this.loadTrustPage(this.trustPageKey(this.trustTab()));
      return;
    }

    this.cmsContext.selectInstitution(id);
    this.cmsContext.setInstitutionTab('home');
    this.institutionHomePage.set(null);
    this.institutionChromePage.set(null);
    this.loadInstitutionPage(id, 'home');
    this.loadCourses(id);
    this.loadScholarships(id);
  }

  protected setTrustTab(id: TrustTab | string | number | undefined): void {
    if (typeof id !== 'string') {
      return;
    }

    const tab = id as TrustTab;
    this.trustTab.set(tab);

    if (tab === 'home' || tab === 'chrome' || tab === 'institutions') {
      this.loadTrustPage(this.trustPageKey(tab));
    }
  }

  protected setInstitutionTab(id: CmsInstitutionTab | string | number | undefined): void {
    if (typeof id !== 'string') {
      return;
    }

    if (id !== 'home' && id !== 'chrome' && id !== 'courses' && id !== 'scholarships') {
      return;
    }

    this.cmsContext.setInstitutionTab(id);
    const institutionId = this.selectedInstitutionId();
    if (!institutionId) {
      return;
    }

    if (id === 'home' || id === 'chrome') {
      this.loadInstitutionPage(institutionId, id);
    } else if (id === 'courses') {
      this.loadCourses(institutionId);
    } else if (id === 'scholarships') {
      this.loadScholarships(institutionId);
    }
  }

  protected institutionSectionEditLink(sectionKey: string): string[] {
    const institutionId = this.selectedInstitutionId();
    const pageKey = this.institutionTab() === 'chrome' ? 'chrome' : 'home';
    return [
      '/cms',
      'institutions',
      institutionId ?? '',
      'pages',
      pageKey,
      'sections',
      sectionKey,
      'edit',
    ];
  }

  protected sectionEditLink(sectionKey: string): string[] {
    return ['/cms', 'trust', this.trustPageKey(this.trustTab()), 'sections', sectionKey, 'edit'];
  }

  protected trustPageKey(tab: TrustTab): string {
    if (tab === 'chrome') {
      return 'chrome';
    }
    if (tab === 'institutions') {
      return 'institutions';
    }
    return 'home';
  }

  private loadTrustPage(pageKey: string): void {
    this.cmsApi.getTrustPage(pageKey).subscribe({
      next: (page) => {
        this.trustPage.set(page);
        this.loadError.set(null);
      },
      error: () => {
        this.trustPage.set(null);
        this.loadError.set('Unable to load trust page content.');
      },
    });
  }

  private restoreInstitutionContextIfNeeded(): void {
    const institutionId = this.selectedInstitutionId();
    if (!institutionId || this.isTrust()) {
      return;
    }

    const known = this.institutions().some((item) => item.id === institutionId);
    if (!known) {
      this.cmsContext.selectTrust();
      this.loadTrustPage('home');
      return;
    }

    const tab = this.institutionTab();
    if (tab === 'home' || tab === 'chrome') {
      this.loadInstitutionPage(institutionId, tab);
    }
    this.loadCourses(institutionId);
    this.loadScholarships(institutionId);
  }

  private loadInstitutionPage(institutionId: string, pageKey: 'home' | 'chrome'): void {
    if (pageKey === 'chrome') {
      this.loadingChromeSections.set(true);
    } else {
      this.loadingHomeSections.set(true);
    }

    this.cmsApi.getInstitutionPage(institutionId, pageKey).subscribe({
      next: (page) => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }

        if (pageKey === 'chrome') {
          this.institutionChromePage.set(page);
          this.loadingChromeSections.set(false);
        } else {
          this.institutionHomePage.set(page);
          this.loadingHomeSections.set(false);
        }
        this.loadError.set(null);
      },
      error: () => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }

        if (pageKey === 'chrome') {
          this.institutionChromePage.set(null);
          this.loadingChromeSections.set(false);
        } else {
          this.institutionHomePage.set(null);
          this.loadingHomeSections.set(false);
        }
        this.loadError.set(`Unable to load institution ${pageKey} sections.`);
      },
    });
  }

  private loadCourses(institutionId: string): void {
    this.loadingCourses.set(true);
    this.cmsApi.listCourses(institutionId).subscribe({
      next: (items) => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }
        this.courses.set(items.map(mapCmsCourseListItemDtoToVm));
        this.loadingCourses.set(false);
        this.loadError.set(null);
      },
      error: () => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }
        this.courses.set([]);
        this.loadingCourses.set(false);
        this.loadError.set('Unable to load courses.');
      },
    });
  }

  private loadScholarships(institutionId: string): void {
    this.loadingScholarships.set(true);
    this.cmsApi.listScholarships(institutionId).subscribe({
      next: (items) => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }
        this.scholarships.set(items);
        this.loadingScholarships.set(false);
        this.loadError.set(null);
      },
      error: () => {
        if (this.selectedInstitutionId() !== institutionId) {
          return;
        }
        this.scholarships.set([]);
        this.loadingScholarships.set(false);
        this.loadError.set('Unable to load scholarships.');
      },
    });
  }
}
