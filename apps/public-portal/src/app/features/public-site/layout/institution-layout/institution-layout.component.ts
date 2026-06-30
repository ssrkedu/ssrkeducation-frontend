import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavDrawerComponent } from '@ssrk/shared/ui';
import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { InstitutionFooterComponent } from './footer/institution-footer.component';
import { InstitutionHeaderComponent } from './header/institution-header.component';
import { buildInstitutionMobileNavConfig } from './institution-mobile-nav.config';

@Component({
  selector: 'app-institution-layout',
  imports: [
    InstitutionHeaderComponent,
    InstitutionFooterComponent,
    MobileNavDrawerComponent,
    RouterOutlet,
  ],
  templateUrl: './institution-layout.component.html',
})
export class InstitutionLayoutComponent {
  private readonly siteContext = inject(SiteContextService);
  protected readonly mobileNavConfig = computed(() =>
    buildInstitutionMobileNavConfig(this.siteContext),
  );
}
