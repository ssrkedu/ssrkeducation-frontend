import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { firstValueFrom } from 'rxjs';
import { APP_ROUTES } from './app.routes';
import { toApiLanguage } from './core/public-api/language-code.util';
import { getResolveHost } from './core/public-api/public-api.routes';
import { SiteContextService } from './core/site-context/site-context.service';
import { SiteLanguageService } from './core/site-context/site-language.service';
import { SiteLanguageSyncService } from './core/site-context/site-language-sync.service';
import { SiteResolverService } from './core/site-context/site-resolver.service';
import { readCachedSite } from './core/site-context/site-session-cache';
import { TrustChromeContentService } from './features/public-site/layout/services/trust-chrome-content.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
    provideRouter(APP_ROUTES),
    provideAppInitializer(() => {
      const siteResolver = inject(SiteResolverService);
      const siteContext = inject(SiteContextService);
      const siteLanguage = inject(SiteLanguageService);

      const hostname = window.location.hostname;
      const resolveHost = getResolveHost(hostname);
      const apiLanguage = toApiLanguage(siteLanguage.language());
      const cachedSite = readCachedSite(resolveHost, apiLanguage);

      // Cache hit: paint immediately; refresh only on successful API response.
      if (cachedSite) {
        siteContext.setSite(cachedSite);
        void firstValueFrom(siteResolver.resolve(hostname))
          .then((site) => siteContext.setSite(site))
          .catch(() => undefined);
        return Promise.resolve();
      }

      return firstValueFrom(siteResolver.resolve(hostname))
        .then((site) => {
          siteContext.setSite(site);
        })
        .catch((error) => {
          const fallback = siteResolver.getFallbackSite(hostname);
          if (fallback) {
            siteContext.setSite(fallback);
            return;
          }

          throw error;
        });
    }),
    provideAppInitializer(() => {
      inject(SiteLanguageSyncService);
      inject(TrustChromeContentService);
      return Promise.resolve();
    }),
  ],
};
