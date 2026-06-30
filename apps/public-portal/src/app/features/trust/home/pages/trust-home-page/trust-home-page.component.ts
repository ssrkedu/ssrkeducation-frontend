import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trust-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-home-page.component.html',
  styleUrl: './trust-home-page.component.scss',
})
export class TrustHomePageComponent {}
