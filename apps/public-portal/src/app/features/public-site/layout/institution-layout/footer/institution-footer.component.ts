import { Component, computed, inject } from '@angular/core';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { buildTrustSiteUrl } from '../../../../../core/site-context/public-site-url.utils';
import { TrustChromeContentService } from '../../services/trust-chrome-content.service';
import { buildSiteLogoSrc, siteLogoAlt } from '../../../../../core/site-context/site-logo.util';

@Component({
  selector: 'app-institution-footer',
  templateUrl: './institution-footer.component.html',
})
export class InstitutionFooterComponent {
  private readonly chromeContent = inject(TrustChromeContentService);
  private readonly siteContext = inject(SiteContextService);

  protected readonly site = this.siteContext.site;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly chrome = this.chromeContent.chrome;
  protected readonly trustSiteUrl = buildTrustSiteUrl();

  protected readonly contact = computed(() => this.chrome()?.contact);
  protected readonly socialLinks = computed(() => this.chrome()?.socialLinks ?? []);
  protected readonly footerIntro = computed(() => this.chrome()?.footerIntro);
  protected readonly logoSrc = computed(
    () => this.site()?.logoUrl || buildSiteLogoSrc(this.site()?.tenantKey),
  );
  protected readonly logoAlt = computed(() => siteLogoAlt(this.site()?.tenantKey));
}
