import { Component, inject } from '@angular/core';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-institution-gallery-page',
  templateUrl: './institution-gallery-page.component.html',
})
export class InstitutionGalleryPageComponent {
  protected readonly site = inject(SiteContextService).site;
}
