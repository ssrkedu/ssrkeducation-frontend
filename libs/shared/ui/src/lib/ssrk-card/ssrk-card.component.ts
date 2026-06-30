import { Component, computed, input } from '@angular/core';
import { Card } from 'primeng/card';
import { SsrkCardVariant } from './ssrk-card.types';

@Component({
  selector: 'app-ssrk-card',
  imports: [Card],
  templateUrl: './ssrk-card.component.html',
})
export class SsrkCardComponent {
  readonly variant = input<SsrkCardVariant>('interactive');
  readonly styleClass = input('');

  protected readonly cardStyleClass = computed(() => {
    const variantClass =
      this.variant() === 'stat' ? 'ssrk-stat-card' : 'ssrk-interactive-card';
    const extra = this.styleClass().trim();

    return extra ? `${variantClass} ${extra}` : variantClass;
  });
}
