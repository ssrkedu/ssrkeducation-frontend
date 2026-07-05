import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, of, skip, switchMap } from 'rxjs';
import { SiteContextService } from './site-context.service';
import { SiteLanguageService } from './site-language.service';
import { SiteResolverService } from './site-resolver.service';

@Injectable({ providedIn: 'root' })
export class SiteLanguageSyncService {
  constructor() {
    const siteLanguage = inject(SiteLanguageService);
    const siteResolver = inject(SiteResolverService);
    const siteContext = inject(SiteContextService);

    toObservable(siteLanguage.language)
      .pipe(
        skip(1),
        switchMap((language) =>
          siteResolver
            .resolve(window.location.hostname, language)
            .pipe(catchError(() => of(null))),
        ),
      )
      .subscribe((site) => {
        if (site) {
          siteContext.setSite(site);
        }
      });
  }
}
