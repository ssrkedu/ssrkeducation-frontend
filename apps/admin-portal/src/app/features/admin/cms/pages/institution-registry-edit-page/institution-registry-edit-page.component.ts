import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Textarea } from 'primeng/textarea';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsInstitutionDetailDto } from '../../api/dtos/cms.dto';

@Component({
  selector: 'app-institution-registry-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    Button,
    InputText,
    InputNumber,
    Textarea,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  ],
  templateUrl: './institution-registry-edit-page.component.html',
})
export class InstitutionRegistryEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cmsApi = inject(CmsApiService);
  protected readonly auth = inject(AuthService);

  private readonly institutionId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  protected readonly detail = signal<CmsInstitutionDetailDto | null>(null);
  protected readonly slug = signal('');
  protected readonly subdomain = signal('');
  protected readonly logoUrl = signal('');
  protected readonly primaryColor = signal('');
  protected readonly iconKey = signal('');
  protected readonly iconBackgroundColor = signal('');
  protected readonly iconStrokeColor = signal('');
  protected readonly sortOrder = signal(0);
  protected readonly odiaName = signal('');
  protected readonly odiaShortName = signal('');
  protected readonly odiaDescription = signal('');
  protected readonly odiaCoursesLine = signal('');
  protected readonly odiaProgramsLine = signal('');
  protected readonly englishName = signal('');
  protected readonly englishShortName = signal('');
  protected readonly englishDescription = signal('');
  protected readonly englishCoursesLine = signal('');
  protected readonly englishProgramsLine = signal('');
  protected readonly activeLanguage = signal<'or' | 'en'>('or');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly pageTitle = computed(() => {
    const item = this.detail();
    return item ? `Edit ${item.code}` : 'Edit Institution';
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') ?? ''),
        switchMap((id) => this.cmsApi.getInstitutionDetail(id)),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (dto) => this.applyDetail(dto),
        error: () => this.errorMessage.set('Unable to load institution.'),
      });
  }

  protected saveDraft(): void {
    this.persist('Draft');
  }

  protected publish(): void {
    this.persist('Published');
  }

  private applyDetail(dto: CmsInstitutionDetailDto): void {
    this.detail.set(dto);
    this.slug.set(dto.slug);
    this.subdomain.set(dto.subdomain);
    this.logoUrl.set(dto.logoUrl ?? '');
    this.primaryColor.set(dto.primaryColor ?? '');
    this.iconKey.set(dto.iconKey ?? '');
    this.iconBackgroundColor.set(dto.iconBackgroundColor ?? '');
    this.iconStrokeColor.set(dto.iconStrokeColor ?? '');
    this.sortOrder.set(dto.sortOrder);

    const odia = dto.translations.find((item) => item.languageCode === 'or');
    const english = dto.translations.find((item) => item.languageCode === 'en');
    this.odiaName.set(odia?.name ?? '');
    this.odiaShortName.set(odia?.shortName ?? '');
    this.odiaDescription.set(odia?.description ?? '');
    this.odiaCoursesLine.set(odia?.coursesLine ?? '');
    this.odiaProgramsLine.set(odia?.programsLine ?? '');
    this.englishName.set(english?.name ?? '');
    this.englishShortName.set(english?.shortName ?? '');
    this.englishDescription.set(english?.description ?? '');
    this.englishCoursesLine.set(english?.coursesLine ?? '');
    this.englishProgramsLine.set(english?.programsLine ?? '');
  }

  private persist(status: 'Draft' | 'Published'): void {
    const id = this.institutionId();
    if (!id || !this.auth.canWriteCms()) {
      return;
    }

    if (!this.odiaName().trim()) {
      this.errorMessage.set('Odia name is required.');
      return;
    }

    this.saving.set(true);
    this.cmsApi
      .updateInstitution(id, {
        slug: this.slug().trim(),
        subdomain: this.subdomain().trim(),
        logoUrl: this.logoUrl().trim() || null,
        primaryColor: this.primaryColor().trim() || null,
        iconKey: this.iconKey().trim() || null,
        iconBackgroundColor: this.iconBackgroundColor().trim() || null,
        iconStrokeColor: this.iconStrokeColor().trim() || null,
        sortOrder: this.sortOrder(),
        translations: [
          {
            languageCode: 'or',
            name: this.odiaName().trim(),
            shortName: this.odiaShortName().trim() || null,
            description: this.odiaDescription().trim() || null,
            coursesLine: this.odiaCoursesLine().trim() || null,
            programsLine: this.odiaProgramsLine().trim() || null,
          },
          {
            languageCode: 'en',
            name: this.englishName().trim() || this.odiaName().trim(),
            shortName: this.englishShortName().trim() || null,
            description: this.englishDescription().trim() || null,
            coursesLine: this.englishCoursesLine().trim() || null,
            programsLine: this.englishProgramsLine().trim() || null,
          },
        ],
      })
      .pipe(switchMap(() => this.cmsApi.setInstitutionStatus(id, { status })))
      .subscribe({
        next: (dto) => {
          this.applyDetail(dto);
          this.saving.set(false);
          void this.router.navigateByUrl('/cms');
        },
        error: () => {
          this.saving.set(false);
          this.errorMessage.set('Unable to save institution.');
        },
      });
  }
}
