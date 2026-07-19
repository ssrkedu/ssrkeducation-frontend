import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import {
  buildTrustEnquiryUrl,
  buildTrustSiteUrl,
} from '../../../../../core/site-context/public-site-url.utils';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { buildSiteLogoSrc, siteLogoAlt } from '../../../../../core/site-context/site-logo.util';

@Component({
  selector: 'app-institution-header',
  imports: [RouterLink, RouterLinkActive, MobileNavHamburgerComponent],
  templateUrl: './institution-header.component.html',
})
export class InstitutionHeaderComponent {
  protected readonly siteContext = inject(SiteContextService);
  protected readonly site = this.siteContext.site;
  protected readonly trustSiteUrl = buildTrustSiteUrl();
  protected readonly enquireNowUrl = computed(() =>
    buildTrustEnquiryUrl(this.site()?.tenantKey),
  );
  protected readonly logoSrc = computed(
    () => this.site()?.logoUrl || buildSiteLogoSrc(this.site()?.tenantKey),
  );
  protected readonly logoAlt = computed(() => siteLogoAlt(this.site()?.tenantKey));
}
