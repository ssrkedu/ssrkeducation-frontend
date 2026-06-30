import { Component, inject } from '@angular/core';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-trust-footer',
  templateUrl: './trust-footer.component.html',
})
export class TrustFooterComponent {
  protected readonly site = inject(SiteContextService).site;
  protected readonly currentYear = new Date().getFullYear();
}
