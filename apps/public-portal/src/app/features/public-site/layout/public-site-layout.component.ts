import { Component, inject } from '@angular/core';
import { SiteContextService } from '../../../core/site-context/site-context.service';
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
}
