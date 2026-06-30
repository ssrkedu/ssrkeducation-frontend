import { Component, input } from '@angular/core';
import { TrustAboutConfig } from './trust-about.config';

@Component({
  selector: 'app-trust-about-section',
  templateUrl: './trust-about-section.component.html',
})
export class TrustAboutSectionComponent {
  readonly content = input.required<TrustAboutConfig>();
}
