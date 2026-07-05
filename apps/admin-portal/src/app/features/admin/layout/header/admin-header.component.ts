import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { Button } from 'primeng/button';
import { AdminDemoDataService } from '../../data/admin-demo.service';
import { AdminHeaderUserMenuComponent } from '../components/admin-header-user-menu/admin-header-user-menu.component';

@Component({
  selector: 'app-admin-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, AdminHeaderUserMenuComponent],
  templateUrl: './admin-header.component.html',
})
export class AdminHeaderComponent {
  private readonly demoData = inject(AdminDemoDataService);

  readonly menuToggle = output<void>();

  protected readonly newEnquiryCount = this.demoData.newEnquiryCount;

  protected onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
