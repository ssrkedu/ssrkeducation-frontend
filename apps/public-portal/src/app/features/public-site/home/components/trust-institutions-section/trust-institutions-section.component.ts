import { Component, input } from '@angular/core';
import { SsrkCardComponent } from '@ssrk/shared/ui';
import { TrustInstitutionsSectionContentVm } from '../../models/trust-institution-card.vm';

@Component({
  selector: 'app-trust-institutions-section',
  imports: [SsrkCardComponent],
  templateUrl: './trust-institutions-section.component.html',
})
export class TrustInstitutionsSectionComponent {
  readonly content = input.required<TrustInstitutionsSectionContentVm>();
}
