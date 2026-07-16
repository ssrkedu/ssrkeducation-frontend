import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Textarea } from 'primeng/textarea';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsTrustSectionDto } from '../../api/dtos/cms.dto';

function prettyJson(raw: string | null | undefined): string {
  if (!raw?.trim()) {
    return '{}';
  }

  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

@Component({
  selector: 'app-trust-section-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Textarea],
  templateUrl: './trust-section-edit-page.component.html',
})
export class TrustSectionEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cmsApi = inject(CmsApiService);
  protected readonly auth = inject(AuthService);

  private readonly params = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => ({
        institutionId: paramMap.get('institutionId'),
        pageKey: paramMap.get('pageKey') ?? 'home',
        sectionKey: paramMap.get('sectionKey') ?? '',
      })),
    ),
    { initialValue: { institutionId: null as string | null, pageKey: 'home', sectionKey: '' } },
  );

  protected readonly section = signal<CmsTrustSectionDto | null>(null);
  protected readonly activeLanguage = signal<'or' | 'en'>('or');
  protected readonly sharedPayload = signal('{}');
  protected readonly odiaPayload = signal('{}');
  protected readonly englishPayload = signal('{}');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly pageTitle = computed(() => {
    const item = this.section();
    return item ? `Edit ${item.sectionKey}` : 'Edit Section';
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((paramMap) => ({
          institutionId: paramMap.get('institutionId'),
          pageKey: paramMap.get('pageKey') ?? 'home',
          sectionKey: paramMap.get('sectionKey') ?? '',
        })),
        switchMap(({ institutionId, pageKey, sectionKey }) =>
          institutionId
            ? this.cmsApi.getInstitutionSection(institutionId, pageKey, sectionKey)
            : this.cmsApi.getTrustSection(pageKey, sectionKey),
        ),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (dto) => {
          this.section.set(dto);
          this.sharedPayload.set(prettyJson(dto.sharedPayload));
          this.odiaPayload.set(
            prettyJson(dto.translations.find((item) => item.languageCode === 'or')?.payload),
          );
          this.englishPayload.set(
            prettyJson(dto.translations.find((item) => item.languageCode === 'en')?.payload),
          );
          this.errorMessage.set(null);
        },
        error: () => {
          this.errorMessage.set('Unable to load section.');
        },
      });
  }

  protected saveDraft(): void {
    this.save('Draft');
  }

  protected publish(): void {
    this.save('Published');
  }

  private save(status: 'Draft' | 'Published'): void {
    const { institutionId, pageKey, sectionKey } = this.params();
    if (!pageKey || !sectionKey || !this.auth.canWriteCms()) {
      return;
    }

    let shared: string;
    let odia: string;
    let english: string;

    try {
      shared = JSON.stringify(JSON.parse(this.sharedPayload()));
      odia = JSON.stringify(JSON.parse(this.odiaPayload()));
      english = JSON.stringify(JSON.parse(this.englishPayload()));
    } catch {
      this.errorMessage.set('Payloads must be valid JSON.');
      return;
    }

    const request = {
      sharedPayload: shared,
      translations: [
        { languageCode: 'or', payload: odia },
        { languageCode: 'en', payload: english },
      ],
    };

    this.saving.set(true);

    const update$ = institutionId
      ? this.cmsApi.updateInstitutionSection(institutionId, pageKey, sectionKey, request)
      : this.cmsApi.updateTrustSection(pageKey, sectionKey, request);

    const status$ = (dto: CmsTrustSectionDto) =>
      institutionId
        ? this.cmsApi.setInstitutionSectionStatus(institutionId, pageKey, sectionKey, {
            status,
            isVisible: true,
          })
        : this.cmsApi.setTrustSectionStatus(pageKey, sectionKey, {
            status,
            isVisible: true,
          });

    update$.pipe(switchMap(status$)).subscribe({
      next: (dto) => {
        this.section.set(dto);
        this.saving.set(false);
        this.errorMessage.set(null);
        void this.router.navigateByUrl('/cms');
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set(
          status === 'Published'
            ? 'Save/publish failed. Odia content is required to publish.'
            : 'Save failed. Check payloads and try again.',
        );
      },
    });
  }
}
