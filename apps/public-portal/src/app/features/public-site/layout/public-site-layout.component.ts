import { Component, effect, inject } from '@angular/core';
import { SiteContextService } from '../../../core/site-context/site-context.service';
import { buildSiteLogoSrc } from '../../../core/site-context/site-logo.util';
import { InstitutionLayoutComponent } from './institution-layout/institution-layout.component';
import { TrustLayoutComponent } from './trust-layout/trust-layout.component';

@Component({
  selector: 'app-public-site-layout',
  imports: [TrustLayoutComponent, InstitutionLayoutComponent],
  template: `
    @if (siteContext.isTrustSite()) {
      <app-trust-layout />
    } @else {
      <app-institution-layout />
    }
  `,
})
export class PublicSiteLayoutComponent {
  protected readonly siteContext = inject(SiteContextService);

  constructor() {
    effect(() => {
      const tenantKey = this.siteContext.site()?.tenantKey;
      if (typeof document === 'undefined') {
        return;
      }

      setDocumentIcon('icon', buildSiteLogoSrc(tenantKey, 'favicon'));
      setDocumentIcon('apple-touch-icon', buildSiteLogoSrc(tenantKey, 'apple'));
    });
  }
}

function setDocumentIcon(rel: 'icon' | 'apple-touch-icon', href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.type = 'image/png';
  link.href = href;
}
