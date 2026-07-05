import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 class="font-serif text-xl font-bold text-ssrk-text-heading">{{ title() }}</h1>
      @if (subtitle()) {
        <span class="text-xs text-ssrk-text-muted">{{ subtitle() }}</span>
      }
      <div class="ml-auto flex flex-wrap items-center gap-2">
        <ng-content />
      </div>
    </div>
  `,
})
export class AdminPageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
