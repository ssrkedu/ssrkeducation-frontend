import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-institution-header',
  imports: [RouterLink, RouterLinkActive, MobileNavHamburgerComponent],
  templateUrl: './institution-header.component.html',
})
export class InstitutionHeaderComponent {
  protected readonly siteContext = inject(SiteContextService);
  protected readonly site = this.siteContext.site;
}
