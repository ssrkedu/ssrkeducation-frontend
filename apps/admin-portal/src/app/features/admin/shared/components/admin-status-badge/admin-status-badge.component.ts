import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type AdminBadgeVariant =
  | 'new'
  | 'reviewed'
  | 'draft'
  | 'published'
  | 'super'
  | 'admin'
  | 'inactive';

@Component({
  selector: 'app-admin-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <span [class]="badgeClass()">{{ label() }}</span>
  `,
})
export class AdminStatusBadgeComponent {
  readonly label = input.required<string>();
  readonly variant = input<AdminBadgeVariant>('new');

  protected badgeClass(): string {
    const base =
      'inline-flex items-center rounded-[10px] px-2.5 py-0.5 text-[11px] font-bold';

    switch (this.variant()) {
      case 'reviewed':
      case 'published':
        return `${base} bg-emerald-100 text-emerald-700`;
      case 'draft':
      case 'inactive':
        return `${base} bg-gray-100 text-gray-500`;
      case 'super':
        return `${base} bg-red-100 text-red-800`;
      case 'admin':
        return `${base} bg-ssrk-blue-light text-ssrk-blue-primary`;
      case 'new':
      default:
        return `${base} bg-amber-100 text-amber-700`;
    }
  }
}
