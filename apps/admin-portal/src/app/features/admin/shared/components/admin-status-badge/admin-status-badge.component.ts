import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';

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
  imports: [Tag],
  template: `
    <p-tag
      [value]="label()"
      [severity]="severity()"
      [rounded]="true"
      styleClass="admin-status-tag"
    />
  `,
})
export class AdminStatusBadgeComponent {
  readonly label = input.required<string>();
  readonly variant = input<AdminBadgeVariant>('new');

  protected readonly severity = computed(() => {
    switch (this.variant()) {
      case 'reviewed':
      case 'published':
        return 'success';
      case 'draft':
      case 'inactive':
        return 'secondary';
      case 'super':
        return 'danger';
      case 'admin':
        return 'info';
      case 'new':
      default:
        return 'warn';
    }
  });
}
