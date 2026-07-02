import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MobileEnquireBarComponent,
  MobileEnquireBarService,
  MobileNavDrawerComponent,
  TRUST_MOBILE_ENQUIRE_CONFIG,
  TRUST_MOBILE_NAV_CONFIG,
} from '@ssrk/shared/ui';
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
  protected readonly mobileNavConfig = TRUST_MOBILE_NAV_CONFIG;
  protected readonly mobileEnquireConfig = TRUST_MOBILE_ENQUIRE_CONFIG;
  protected readonly enquireService = inject(MobileEnquireBarService);
}
