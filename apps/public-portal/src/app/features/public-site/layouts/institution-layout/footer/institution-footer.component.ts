import { Component, inject } from '@angular/core';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-institution-footer',
  templateUrl: './institution-footer.component.html',
})
export class InstitutionFooterComponent {
  protected readonly site = inject(SiteContextService).site;
  protected readonly currentYear = new Date().getFullYear();
}
