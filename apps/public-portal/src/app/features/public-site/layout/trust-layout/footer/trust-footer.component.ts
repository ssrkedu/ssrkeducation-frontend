import { Component, computed, inject } from '@angular/core';
import { TrustChromeContentService } from '../../services/trust-chrome-content.service';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { buildSiteLogoSrc, siteLogoAlt } from '../../../../../core/site-context/site-logo.util';

@Component({
  selector: 'app-trust-footer',
  templateUrl: './trust-footer.component.html',
})
export class TrustFooterComponent {
  private readonly chromeContent = inject(TrustChromeContentService);
  private readonly siteContext = inject(SiteContextService);

  protected readonly site = this.siteContext.site;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly chrome = this.chromeContent.chrome;

  protected readonly contact = computed(() => this.chrome()?.contact);
  protected readonly socialLinks = computed(() => this.chrome()?.socialLinks ?? []);
  protected readonly footerIntro = computed(() => this.chrome()?.footerIntro);
  protected readonly institutionLinks = computed(
    () =>
      this.chrome()?.institutionFooterLinks.map((link) => ({
        label: link.label,
        href: link.href ?? link.routerLink ?? '#',
      })) ?? [],
  );
  protected readonly logoSrc = computed(
    () => this.site()?.logoUrl || buildSiteLogoSrc(this.site()?.tenantKey),
  );
  protected readonly logoAlt = computed(() => siteLogoAlt(this.site()?.tenantKey));
}
