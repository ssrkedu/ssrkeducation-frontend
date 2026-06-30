import { Component, input } from '@angular/core';
import { SsrkCardComponent } from '../ssrk-card/ssrk-card.component';
import { StatCardData } from './stats-bar.types';

@Component({
  selector: 'app-stats-bar',
  imports: [SsrkCardComponent],
  templateUrl: './stats-bar.component.html',
})
export class StatsBarComponent {
  readonly items = input.required<StatCardData[]>();
  readonly footnote = input<string>();
  readonly ariaLabel = input('Key statistics');
}
