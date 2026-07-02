import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MobileEnquireBarComponent,
  MobileEnquireBarService,
  MobileNavDrawerConfig,
  MobileNavDrawerComponent,
  TRUST_MOBILE_ENQUIRE_CONFIG,
  TRUST_MOBILE_NAV_CONFIG,
} from '@ssrk/shared/ui';
import { buildTenantSiteUrl } from '../../../../core/site-context/public-site-url.utils';
import { TrustFooterComponent } from './footer/trust-footer.component';
import { TrustHeaderComponent } from './header/trust-header.component';

@Component({
  selector: 'app-trust-layout',
  providers: [MobileEnquireBarService],
  imports: [
    TrustHeaderComponent,
    TrustFooterComponent,
    MobileNavDrawerComponent,
    MobileEnquireBarComponent,
    RouterOutlet,
  ],
  templateUrl: './trust-layout.component.html',
})
export class TrustLayoutComponent {
  protected readonly mobileNavConfig: MobileNavDrawerConfig = {
    ...TRUST_MOBILE_NAV_CONFIG,
    items: TRUST_MOBILE_NAV_CONFIG.items.map((item) => {
      if (item.type !== 'group' || item.label !== 'Institutions') {
        return item;
      }

      return {
        ...item,
        children: item.children.map((child) => {
          if (child.label === 'Sri Sai Rama Krishna Degree College') {
            return { ...child, href: buildTenantSiteUrl('ssrkdc') };
          }

          if (child.label === 'Sri Sai Rama Krishna Junior College (+2)') {
            return { ...child, href: buildTenantSiteUrl('ssrkjc') };
          }

          return child;
        }),
      };
    }),
  };
  protected readonly mobileEnquireConfig = TRUST_MOBILE_ENQUIRE_CONFIG;
  protected readonly enquireService = inject(MobileEnquireBarService);
}
