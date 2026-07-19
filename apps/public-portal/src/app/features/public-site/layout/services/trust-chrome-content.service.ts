import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { toApiLanguage } from '../../../../core/public-api/language-code.util';
import { PublicPageContentService } from '../../../../core/public-api/public-page-content.service';
import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { SiteLanguageService } from '../../../../core/site-context/site-language.service';
import { mapChromePageToVm } from '../mappers/trust-chrome-content.mapper';
import { TrustChromeContentVm } from '../models/trust-chrome-content.vm';

@Injectable({ providedIn: 'root' })
export class TrustChromeContentService {
  private readonly pageContent = inject(PublicPageContentService);
  private readonly siteLanguage = inject(SiteLanguageService);
  private readonly siteContext = inject(SiteContextService);

  private readonly chromeState = signal<TrustChromeContentVm | null>(null);
  private readonly loadingState = signal(true);
  private readonly errorState = signal<string | null>(null);

  readonly chrome = this.chromeState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  constructor() {
    combineLatest([
      toObservable(this.siteContext.site),
      toObservable(this.siteLanguage.language),
    ])
      .pipe(
        tap(() => {
          this.loadingState.set(true);
          this.errorState.set(null);
        }),
        switchMap(([site, language]) => {
          const tenantKey = site?.tenantKey;
          if (!tenantKey) {
            return of(null);
          }

          return this.pageContent
            .getPageContent(tenantKey, 'chrome', toApiLanguage(language))
            .pipe(
              map(mapChromePageToVm),
              catchError((error: unknown) => {
                this.errorState.set(
                  error instanceof Error
                    ? error.message
                    : 'Unable to load site chrome.',
                );
                return of(null);
              }),
            );
        }),
      )
      .subscribe((chrome) => {
        this.chromeState.set(chrome);
        this.loadingState.set(false);
      });
  }
}
