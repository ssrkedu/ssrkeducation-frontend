import { Component, input } from '@angular/core';
import { TrustAboutContentVm } from '../../models/trust-about-content.vm';

@Component({
  selector: 'app-trust-about-section',
  templateUrl: './trust-about-section.component.html',
})
export class TrustAboutSectionComponent {
  readonly content = input.required<TrustAboutContentVm>();
}
