import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Textarea } from 'primeng/textarea';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';

@Component({
  selector: 'app-trust-seo-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    Button,
    InputText,
    Textarea,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  ],
  templateUrl: './trust-seo-edit-page.component.html',
})
export class TrustSeoEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cmsApi = inject(CmsApiService);
  protected readonly auth = inject(AuthService);

  private readonly pageKey = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('pageKey') ?? 'home')),
    { initialValue: 'home' },
  );

  protected readonly pageTitle = computed(() => `SEO — ${this.pageKey()}`);
  protected readonly activeLanguage = signal<'or' | 'en'>('or');
  protected readonly odiaTitle = signal('');
  protected readonly odiaMetaTitle = signal('');
  protected readonly odiaMetaDescription = signal('');
  protected readonly englishTitle = signal('');
  protected readonly englishMetaTitle = signal('');
  protected readonly englishMetaDescription = signal('');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('pageKey') ?? 'home'),
        switchMap((pageKey) => this.cmsApi.getTrustPage(pageKey)),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (page) => {
          const odia = page.seoTranslations.find((item) => item.languageCode === 'or');
          const english = page.seoTranslations.find((item) => item.languageCode === 'en');
          this.odiaTitle.set(odia?.title ?? '');
          this.odiaMetaTitle.set(odia?.metaTitle ?? '');
          this.odiaMetaDescription.set(odia?.metaDescription ?? '');
          this.englishTitle.set(english?.title ?? '');
          this.englishMetaTitle.set(english?.metaTitle ?? '');
          this.englishMetaDescription.set(english?.metaDescription ?? '');
        },
        error: () => this.errorMessage.set('Unable to load SEO.'),
      });
  }

  protected save(): void {
    if (!this.auth.canWriteCms()) {
      return;
    }

    if (!this.odiaTitle().trim() && !this.odiaMetaTitle().trim()) {
      this.errorMessage.set('Odia title or meta title is required.');
      return;
    }

    this.saving.set(true);
    this.cmsApi
      .updateTrustPageSeo(this.pageKey(), {
        translations: [
          {
            languageCode: 'or',
            title: this.odiaTitle().trim(),
            metaTitle: this.odiaMetaTitle().trim() || null,
            metaDescription: this.odiaMetaDescription().trim() || null,
          },
          {
            languageCode: 'en',
            title: this.englishTitle().trim() || this.odiaTitle().trim(),
            metaTitle: this.englishMetaTitle().trim() || null,
            metaDescription: this.englishMetaDescription().trim() || null,
          },
        ],
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          void this.router.navigateByUrl('/cms');
        },
        error: () => {
          this.saving.set(false);
          this.errorMessage.set('Unable to save SEO.');
        },
      });
  }
}
