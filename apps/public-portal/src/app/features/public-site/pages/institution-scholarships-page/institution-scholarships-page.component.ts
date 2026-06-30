import { Component, inject } from '@angular/core';
import { SiteContextService } from '../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-institution-scholarships-page',
  templateUrl: './institution-scholarships-page.component.html',
})
export class InstitutionScholarshipsPageComponent {
  protected readonly site = inject(SiteContextService).site;
}
