import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AdminSidebarBrandComponent } from '../components/admin-sidebar-brand/admin-sidebar-brand.component';
import { AdminSidebarNavComponent } from '../components/admin-sidebar-nav/admin-sidebar-nav.component';

@Component({
  selector: 'app-admin-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AdminSidebarBrandComponent, AdminSidebarNavComponent],
  templateUrl: './admin-sidebar.component.html',
})
export class AdminSidebarComponent {
  readonly mobileOpen = input(false);
  readonly navigate = output<void>();

  protected onNavigate(): void {
    this.navigate.emit();
  }
}
