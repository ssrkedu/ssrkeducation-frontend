import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import { buildTrustEnquiryUrl } from '../../../../../core/site-context/public-site-url.utils';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-institution-header',
  imports: [RouterLink, RouterLinkActive, MobileNavHamburgerComponent],
  templateUrl: './institution-header.component.html',
})
export class InstitutionHeaderComponent {
  protected readonly siteContext = inject(SiteContextService);
  protected readonly site = this.siteContext.site;
  protected readonly enquireNowUrl = computed(() =>
    buildTrustEnquiryUrl(this.site()?.tenantKey),
  );
}
