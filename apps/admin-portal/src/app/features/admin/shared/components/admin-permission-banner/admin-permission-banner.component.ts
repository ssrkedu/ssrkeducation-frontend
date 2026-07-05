import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-permission-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mb-3.5 flex items-center gap-2 rounded-ssrk-sm border-[1.5px] border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900"
    >
      <svg
        class="h-3.5 w-3.5 shrink-0 stroke-amber-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{{ message() }}</span>
    </div>
  `,
})
export class AdminPermissionBannerComponent {
  readonly message = input(
    'You have read-only access. Contact Super Admin to enable write permissions.',
  );
}
