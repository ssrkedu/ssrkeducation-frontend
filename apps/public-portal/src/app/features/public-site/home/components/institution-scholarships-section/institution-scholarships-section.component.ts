import { Component, input } from '@angular/core';
import { SsrkCardComponent } from '@ssrk/shared/ui';
import {
  InstitutionScholarshipCardVm,
  InstitutionScholarshipsSectionVm,
} from '../../models/institution-home-page-content.vm';

@Component({
  selector: 'app-institution-scholarships-section',
  imports: [SsrkCardComponent],
  templateUrl: './institution-scholarships-section.component.html',
})
export class InstitutionScholarshipsSectionComponent {
  readonly content = input.required<InstitutionScholarshipsSectionVm>();
  readonly applyNowUrl = input<string | null>(null);

  protected eligibilityHref(scholarship: InstitutionScholarshipCardVm): string | null {
    return scholarship.checkEligibilityUrl?.trim() || this.applyNowUrl() || null;
  }
}
