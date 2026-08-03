import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Textarea } from 'primeng/textarea';
import { map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsCourseDetailDto } from '../../api/dtos/cms.dto';
import { CmsContextService } from '../../data/cms-context.service';
import { CmsLanguageRequirementsService } from '../../data/cms-language-requirements.service';

@Component({
  selector: 'app-course-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    Button,
    InputNumber,
    InputText,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Textarea,
  ],
  templateUrl: './course-edit-page.component.html',
})
export class CourseEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cmsApi = inject(CmsApiService);
  private readonly cmsContext = inject(CmsContextService);
  protected readonly auth = inject(AuthService);
  private readonly languageRequirements = inject(CmsLanguageRequirementsService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
    { initialValue: null },
  );

  protected readonly detail = signal<CmsCourseDetailDto | null>(null);
  protected readonly code = signal('');
  protected readonly slugValue = signal('');
  protected readonly sortOrder = signal(0);
  protected readonly odiaName = signal('');
  protected readonly odiaSummary = signal('');
  protected readonly odiaDescription = signal('');
  protected readonly odiaEligibility = signal('');
  protected readonly odiaFeeDisplayText = signal('');
  protected readonly englishName = signal('');
  protected readonly englishSummary = signal('');
  protected readonly englishDescription = signal('');
  protected readonly englishEligibility = signal('');
  protected readonly englishFeeDisplayText = signal('');
  protected readonly activeLanguage = signal<'or' | 'en'>('or');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly pageTitle = computed(() => {
    const slug = this.slug();
    if (!slug || slug === 'new') {
      return 'New Course';
    }
    return this.detail() ? `Edit ${this.detail()!.code}` : 'Edit Course';
  });

  protected readonly odiaTabLabel = computed(() =>
    this.languageRequirements.requiredLabel('or', 'ଓଡ଼ିଆ'),
  );

  protected readonly englishTabLabel = computed(() =>
    this.languageRequirements.requiredLabel('en', 'English'),
  );

  constructor() {
    this.languageRequirements.ensureLoaded().pipe(takeUntilDestroyed()).subscribe();

    this.route.paramMap
      .pipe(
        map((params) => params.get('slug')),
        switchMap((slug) => {
          const institutionId = this.cmsContext.selectedInstitutionId();
          if (!slug || slug === 'new' || !institutionId) {
            this.detail.set(null);
            return of(null);
          }
          return this.cmsApi.getCourseBySlug(institutionId, slug);
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (dto) => {
          if (!dto) {
            return;
          }
          this.applyDetail(dto);
        },
        error: () => this.errorMessage.set('Unable to load course.'),
      });
  }

  protected saveDraft(): void {
    this.persist('Draft');
  }

  protected publish(): void {
    this.persist('Published');
  }

  private applyDetail(dto: CmsCourseDetailDto): void {
    this.detail.set(dto);
    this.code.set(dto.code);
    this.slugValue.set(dto.slug);
    this.sortOrder.set(dto.sortOrder);

    const odia = dto.translations.find((item) => item.languageCode === 'or');
    const english = dto.translations.find((item) => item.languageCode === 'en');
    this.odiaName.set(odia?.name ?? '');
    this.odiaSummary.set(odia?.summary ?? '');
    this.odiaDescription.set(odia?.description ?? '');
    this.odiaEligibility.set(odia?.eligibility ?? '');
    this.odiaFeeDisplayText.set(odia?.feeDisplayText ?? '');
    this.englishName.set(english?.name ?? '');
    this.englishSummary.set(english?.summary ?? '');
    this.englishDescription.set(english?.description ?? '');
    this.englishEligibility.set(english?.eligibility ?? '');
    this.englishFeeDisplayText.set(english?.feeDisplayText ?? '');
  }

  private persist(status: 'Draft' | 'Published'): void {
    const institutionId = this.cmsContext.selectedInstitutionId();
    if (!institutionId || !this.auth.canWriteCms()) {
      this.errorMessage.set('Select an institution in Content Management first.');
      return;
    }

    if (status === 'Published' && !this.auth.canPublishCms()) {
      this.errorMessage.set('You do not have permission to publish CMS content.');
      return;
    }

    const requiredError = this.languageRequirements.missingRequiredNameMessage({
      or: this.odiaName(),
      en: this.englishName(),
    });
    if (requiredError) {
      this.errorMessage.set(requiredError);
      return;
    }

    if (!this.slugValue().trim()) {
      this.errorMessage.set('Slug is required.');
      return;
    }

    const payload = {
      code: this.code().trim() || this.slugValue().trim(),
      slug: this.slugValue().trim(),
      sortOrder: this.sortOrder(),
      translations: [
        {
          languageCode: 'or',
          name: this.odiaName().trim(),
          summary: this.odiaSummary().trim() || null,
          description: this.odiaDescription().trim() || null,
          eligibility: this.odiaEligibility().trim() || null,
          feeDisplayText: this.odiaFeeDisplayText().trim() || null,
        },
        {
          languageCode: 'en',
          name: this.englishName().trim() || this.odiaName().trim(),
          summary: this.englishSummary().trim() || null,
          description: this.englishDescription().trim() || null,
          eligibility: this.englishEligibility().trim() || null,
          feeDisplayText: this.englishFeeDisplayText().trim() || null,
        },
      ],
    };

    this.saving.set(true);
    const existing = this.detail();
    const save$ = existing
      ? this.cmsApi.updateCourse(existing.id, payload)
      : this.cmsApi.createCourse(institutionId, payload);

    save$
      .pipe(
        switchMap((dto) => {
          this.cmsContext.setInstitutionTab('courses');
          if (!this.auth.canPublishCms()) {
            return of(dto);
          }
          return this.cmsApi.setCourseStatus(dto.id, { status });
        }),
      )
      .subscribe({
        next: () => {
          this.saving.set(false);
          void this.router.navigateByUrl('/cms');
        },
        error: () => {
          this.saving.set(false);
          this.errorMessage.set('Unable to save course.');
        },
      });
  }
}
