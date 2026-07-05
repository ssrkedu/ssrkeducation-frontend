import { Component, input } from '@angular/core';
import { InstitutionOverviewVm } from '../../models/institution-home-page-content.vm';

@Component({
  selector: 'app-institution-overview-section',
  templateUrl: './institution-overview-section.component.html',
})
export class InstitutionOverviewSectionComponent {
  readonly content = input.required<InstitutionOverviewVm>();
}
