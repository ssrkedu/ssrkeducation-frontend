import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-trust-header',
  imports: [RouterLink, RouterLinkActive, MobileNavHamburgerComponent],
  templateUrl: './trust-header.component.html',
})
export class TrustHeaderComponent {
  protected readonly site = inject(SiteContextService).site;
}
