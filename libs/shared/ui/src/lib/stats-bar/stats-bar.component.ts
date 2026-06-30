import { Component, input } from '@angular/core';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { StatCardData } from '../stat-card/stat-card.types';

@Component({
  selector: 'app-stats-bar',
  imports: [StatCardComponent],
  templateUrl: './stats-bar.component.html',
})
export class StatsBarComponent {
  readonly items = input.required<StatCardData[]>();
  readonly footnote = input<string>();
  readonly ariaLabel = input('Key statistics');
}
