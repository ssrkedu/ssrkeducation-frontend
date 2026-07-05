import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MobileEnquireBarComponent,
  MobileEnquireBarService,
  MobileNavDrawerComponent,
} from '@ssrk/shared/ui';
import { buildInstitutionMobileEnquireConfig } from '../../../../core/config/public-site/institution/institution-mobile-enquire.config';
import { buildInstitutionMobileNavConfig } from '../../../../core/config/public-site/institution/institution-mobile-nav.config';
import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { InstitutionFooterComponent } from './footer/institution-footer.component';
import { InstitutionHeaderComponent } from './header/institution-header.component';

@Component({
  selector: 'app-institution-layout',
  providers: [MobileEnquireBarService],
  imports: [
    InstitutionHeaderComponent,
    InstitutionFooterComponent,
    MobileNavDrawerComponent,
    MobileEnquireBarComponent,
    RouterOutlet,
  ],
  templateUrl: './institution-layout.component.html',
})
export class InstitutionLayoutComponent {
  private readonly siteContext = inject(SiteContextService);

  protected readonly mobileNavConfig = computed(() =>
    buildInstitutionMobileNavConfig(this.siteContext),
  );

  protected readonly mobileEnquireConfig = computed(() =>
    buildInstitutionMobileEnquireConfig(this.siteContext.site()?.tenantKey),
  );

  protected readonly enquireService = inject(MobileEnquireBarService);
}
