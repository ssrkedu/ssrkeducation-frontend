import { Component, input } from '@angular/core';
import { EnquiryFormComponent, EnquiryFormOption } from '@ssrk/shared/ui';
import { TRUST_ENQUIRY_SECTION } from '../../pages/trust-home-page/trust-enquiry-section.config';

export interface TrustEnquirySectionContent {
  sectionLabel: string;
  title: string;
  description: string;
  highlights: readonly string[];
}

@Component({
  selector: 'app-trust-enquiry-section',
  imports: [EnquiryFormComponent],
  templateUrl: './trust-enquiry-section.component.html',
})
export class TrustEnquirySectionComponent {
  readonly content = input<TrustEnquirySectionContent>(TRUST_ENQUIRY_SECTION);
  readonly collegeOptions = input.required<EnquiryFormOption[]>();
}
