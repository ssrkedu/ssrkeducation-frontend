import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-admin-permission-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Message],
  template: `
    <p-message severity="warn" styleClass="admin-permission-message mb-3.5 w-full">
      {{ message() }}
    </p-message>
  `,
})
export class AdminPermissionBannerComponent {
  readonly message = input(
    'You have read-only access. Contact Super Admin to enable write permissions.',
  );
}
