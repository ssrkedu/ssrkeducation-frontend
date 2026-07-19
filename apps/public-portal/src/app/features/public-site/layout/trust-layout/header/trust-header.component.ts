import { afterNextRender, Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LangToggleComponent, MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import { TrustChromeContentService } from '../../services/trust-chrome-content.service';
import { SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { buildSiteLogoSrc, siteLogoAlt } from '../../../../../core/site-context/site-logo.util';

@Component({
  selector: 'app-trust-header',
  host: { class: 'block shrink-0' },
  imports: [RouterLink, RouterLinkActive, LangToggleComponent, MobileNavHamburgerComponent],
  templateUrl: './trust-header.component.html',
})
export class TrustHeaderComponent {
  private readonly headerRef = viewChild<ElementRef<HTMLElement>>('headerRef');
  private readonly destroyRef = inject(DestroyRef);
  private readonly chromeContent = inject(TrustChromeContentService);
  private readonly siteContext = inject(SiteContextService);

  protected readonly site = this.siteContext.site;
  protected readonly siteLanguage = inject(SiteLanguageService);
  protected readonly headerSpacerHeight = signal(70);
  protected readonly navLinks = computed(
    () => this.chromeContent.chrome()?.navLinks ?? [],
  );
  protected readonly logoSrc = computed(
    () => this.site()?.logoUrl || buildSiteLogoSrc(this.site()?.tenantKey),
  );
  protected readonly logoAlt = computed(() => siteLogoAlt(this.site()?.tenantKey));

  constructor() {
    afterNextRender(() => {
      const header = this.headerRef()?.nativeElement;
      if (!header) {
        return;
      }

      const syncHeight = () => {
        const height = header.offsetHeight;
        this.headerSpacerHeight.set(height);
        document.documentElement.style.setProperty('--trust-header-height', `${height}px`);
      };
      syncHeight();

      const observer = new ResizeObserver(syncHeight);
      observer.observe(header);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        document.documentElement.style.removeProperty('--trust-header-height');
      });
    });
  }
}
