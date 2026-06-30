import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { StatCardData } from './stat-card.types';

@Component({
  selector: 'app-stat-card',
  imports: [Card],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  readonly data = input.required<StatCardData>();
}
