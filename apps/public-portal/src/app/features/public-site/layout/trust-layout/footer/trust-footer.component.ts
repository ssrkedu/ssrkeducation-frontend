import { Component, inject } from '@angular/core';
import { buildTenantSiteUrl } from '../../../../../core/site-context/public-site-url.utils';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { TRUST_CONTACT, TRUST_SOCIAL_LINKS } from '../trust-chrome.config';

@Component({
  selector: 'app-trust-footer',
  templateUrl: './trust-footer.component.html',
})
export class TrustFooterComponent {
  protected readonly site = inject(SiteContextService).site;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly contact = TRUST_CONTACT;
  protected readonly socialLinks = TRUST_SOCIAL_LINKS;
  protected readonly institutionLinks = [
    { label: 'Degree College', href: buildTenantSiteUrl('ssrkdc') },
    { label: 'Junior College (+2)', href: buildTenantSiteUrl('ssrkjc') },
  ];
}
