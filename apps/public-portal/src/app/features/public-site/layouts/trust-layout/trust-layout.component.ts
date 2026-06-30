import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavDrawerComponent } from '@ssrk/shared/ui';
import { TrustFooterComponent } from './footer/trust-footer.component';
import { TrustHeaderComponent } from './header/trust-header.component';
import { TRUST_MOBILE_NAV_CONFIG } from './trust-mobile-nav.config';

@Component({
  selector: 'app-trust-layout',
  imports: [TrustHeaderComponent, TrustFooterComponent, MobileNavDrawerComponent, RouterOutlet],
  templateUrl: './trust-layout.component.html',
})
export class TrustLayoutComponent {
  protected readonly mobileNavConfig = TRUST_MOBILE_NAV_CONFIG;
}
