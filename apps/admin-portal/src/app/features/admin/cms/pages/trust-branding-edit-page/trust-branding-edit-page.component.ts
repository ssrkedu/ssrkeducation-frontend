import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsLanguageRequirementsService } from '../../data/cms-language-requirements.service';

@Component({
  selector: 'app-trust-branding-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, Button, InputText, Tabs, TabList, Tab, TabPanels, TabPanel],
  templateUrl: './trust-branding-edit-page.component.html',
})
export class TrustBrandingEditPageComponent {
  private readonly cmsApi = inject(CmsApiService);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);
  private readonly languageRequirements = inject(CmsLanguageRequirementsService);

  protected readonly primaryColor = signal('#1e3a8a');
  protected readonly logoUrl = signal('');
  protected readonly odiaName = signal('');
  protected readonly odiaTagline = signal('');
  protected readonly englishName = signal('');
  protected readonly englishTagline = signal('');
  protected readonly activeLanguage = signal<'or' | 'en'>('en');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  constructor() {
    this.languageRequirements.ensureLoaded().pipe(takeUntilDestroyed()).subscribe();

    this.cmsApi
      .getTrustSite()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (site) => {
          this.primaryColor.set(site.primaryColor ?? '');
          this.logoUrl.set(site.logoUrl ?? '');
          const odia = site.translations.find((item) => item.languageCode === 'or');
          const english = site.translations.find((item) => item.languageCode === 'en');
          this.odiaName.set(odia?.name ?? '');
          this.odiaTagline.set(odia?.tagline ?? '');
          this.englishName.set(english?.name ?? '');
          this.englishTagline.set(english?.tagline ?? '');
        },
        error: () => this.errorMessage.set('Unable to load branding.'),
      });
  }

  protected save(): void {
    if (!this.auth.canWriteCms()) {
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

    this.saving.set(true);
    this.cmsApi
      .updateTrustSite({
        primaryColor: this.primaryColor() || null,
        logoUrl: this.logoUrl() || null,
        translations: [
          {
            languageCode: 'or',
            name: this.odiaName().trim(),
            tagline: this.odiaTagline().trim() || null,
          },
          {
            languageCode: 'en',
            name: this.englishName().trim() || this.odiaName().trim(),
            tagline: this.englishTagline().trim() || null,
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
          this.errorMessage.set('Unable to save branding.');
        },
      });
  }
}
