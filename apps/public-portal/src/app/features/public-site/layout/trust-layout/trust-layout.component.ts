import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MobileEnquireBarComponent,
  MobileEnquireBarService,
  MobileNavDrawerComponent,
} from '@ssrk/shared/ui';
import { TrustChromeContentService } from '../services/trust-chrome-content.service';
import { TrustFooterComponent } from './footer/trust-footer.component';
import { TrustHeaderComponent } from './header/trust-header.component';
// FALLBACK-PHASE: static chrome configs kept for content-fallback plan
// import { TRUST_MOBILE_ENQUIRE_CONFIG, TRUST_MOBILE_NAV_CONFIG } from '@ssrk/shared/ui';

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
  private readonly chromeContent = inject(TrustChromeContentService);

  protected readonly mobileNavConfig = computed(
    () => this.chromeContent.chrome()?.mobileNavConfig,
  );
  protected readonly mobileEnquireConfig = computed(
    () => this.chromeContent.chrome()?.mobileEnquireConfig,
  );
  protected readonly enquireService = inject(MobileEnquireBarService);
}
