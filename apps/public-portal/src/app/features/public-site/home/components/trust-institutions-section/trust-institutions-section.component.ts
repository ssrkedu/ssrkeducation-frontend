import { Component, input } from '@angular/core';
import { SsrkCardComponent } from '@ssrk/shared/ui';
import { TrustInstitutionsSectionContent } from '../../mappers/trust-institution-card.mapper';

@Component({
  selector: 'app-trust-institutions-section',
  imports: [SsrkCardComponent],
  templateUrl: './trust-institutions-section.component.html',
})
export class TrustInstitutionsSectionComponent {
  readonly content = input.required<TrustInstitutionsSectionContent>();
}
