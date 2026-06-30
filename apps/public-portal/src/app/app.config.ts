import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { firstValueFrom } from 'rxjs';
import { APP_ROUTES } from './app.routes';
import { SiteContextService } from './core/site-context/site-context.service';
import { SiteResolverService } from './core/site-context/site-resolver.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
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

      return firstValueFrom(siteResolver.resolve()).then((site) => {
        siteContext.setSite(site);
      });
    }),
  ],
};
