import { Component, input } from '@angular/core';
import { SsrkCardComponent } from '@ssrk/shared/ui';
import { InstitutionCoursesSectionVm } from '../../models/institution-home-page-content.vm';

@Component({
  selector: 'app-institution-courses-section',
  imports: [SsrkCardComponent],
  templateUrl: './institution-courses-section.component.html',
})
export class InstitutionCoursesSectionComponent {
  readonly content = input.required<InstitutionCoursesSectionVm>();
  readonly applyNowUrl = input<string | null>(null);
}
