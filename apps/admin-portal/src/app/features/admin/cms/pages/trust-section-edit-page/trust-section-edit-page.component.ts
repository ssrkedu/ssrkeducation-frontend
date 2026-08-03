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
import { CmsLanguageRequirementsService } from '../../data/cms-language-requirements.service';
import {
  sectionPayloadExample,
  sharedPayloadExample,
} from '../../data/section-payload-examples';

/** Escape raw line breaks/tabs inside JSON strings so pasted multi-line values still parse. */
function escapeRawBreaksInJsonStrings(raw: string): string {
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (escaped) {
      result += ch;
      escaped = false;
      continue;
    }

    if (inString && ch === '\\') {
      result += ch;
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }

    if (inString) {
      if (ch === '\n') {
        result += '\\n';
        continue;
      }
      if (ch === '\r') {
        if (raw[i + 1] === '\n') {
          i++;
        }
        result += '\\n';
        continue;
      }
      if (ch === '\t') {
        result += '\\t';
        continue;
      }
    }

    result += ch;
  }

  return result;
}

function parsePayloadObject(raw: string): unknown {
  return JSON.parse(escapeRawBreaksInJsonStrings(raw.trim() || '{}'));
}

function prettyJson(raw: string | null | undefined): string {
  if (!raw?.trim()) {
    return '';
  }

  try {
    const parsed = parsePayloadObject(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length === 0) {
      return '';
    }
    return JSON.stringify(parsed, null, 2);
  } catch {
    return raw;
  }
}

function isEmptyPayloadText(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === '{}' || trimmed === 'null') {
    return true;
  }

  try {
    const parsed = parsePayloadObject(trimmed);
    return !!parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length === 0;
  } catch {
    return false;
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
  private readonly languageRequirements = inject(CmsLanguageRequirementsService);
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
  protected readonly activeLanguage = signal<'or' | 'en'>('en');
  protected readonly sharedPayload = signal('');
  protected readonly odiaPayload = signal('');
  protected readonly englishPayload = signal('');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly showSharedExample = signal(true);
  protected readonly showLanguageExample = signal(true);

  protected readonly pageTitle = computed(() => {
    const item = this.section();
    return item ? `Edit ${item.sectionKey}` : 'Edit Section';
  });

  protected readonly odiaTabLabel = computed(() =>
    this.languageRequirements.requiredLabel('or', 'ଓଡ଼ିଆ'),
  );

  protected readonly englishTabLabel = computed(() =>
    this.languageRequirements.requiredLabel('en', 'English'),
  );

  protected readonly sharedExample = sharedPayloadExample();
  protected readonly languageExample = computed(() =>
    sectionPayloadExample(this.section()?.sectionKey ?? this.params().sectionKey),
  );

  constructor() {
    this.languageRequirements.ensureLoaded().pipe(takeUntilDestroyed()).subscribe();

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

  protected toggleSharedExample(): void {
    this.showSharedExample.update((open) => !open);
  }

  protected toggleLanguageExample(): void {
    this.showLanguageExample.update((open) => !open);
  }

  protected useSharedExample(): void {
    if (!this.auth.canWriteCms()) {
      return;
    }
    this.sharedPayload.set(this.sharedExample);
  }

  protected useLanguageExample(language: 'en' | 'or'): void {
    if (!this.auth.canWriteCms()) {
      return;
    }
    const example = this.languageExample();
    if (language === 'en') {
      this.englishPayload.set(example);
    } else {
      this.odiaPayload.set(example);
    }
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
      shared = JSON.stringify(parsePayloadObject(this.sharedPayload()));
      odia = JSON.stringify(parsePayloadObject(this.odiaPayload()));
      english = JSON.stringify(parsePayloadObject(this.englishPayload()));
    } catch {
      this.errorMessage.set('Payloads must be valid JSON.');
      return;
    }

    if (this.languageRequirements.isRequired('en') && isEmptyPayloadText(english)) {
      this.errorMessage.set('English translation is required.');
      return;
    }
    if (this.languageRequirements.isRequired('or') && isEmptyPayloadText(odia)) {
      this.errorMessage.set('Odia translation is required.');
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

    const status$ = () =>
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
      next: () => {
        this.saving.set(false);
        this.errorMessage.set(null);
        void this.router.navigateByUrl('/cms');
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set(
          'Save failed. Fill required language payloads with valid JSON and try again.',
        );
      },
    });
  }
}
