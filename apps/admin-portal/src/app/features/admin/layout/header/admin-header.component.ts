import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { filter, map } from 'rxjs';
import { AdminDemoDataService } from '../../data/admin-demo.service';
import { AdminHeaderUserMenuComponent } from '../components/admin-header-user-menu/admin-header-user-menu.component';

@Component({
  selector: 'app-admin-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, AdminHeaderUserMenuComponent],
  templateUrl: './admin-header.component.html',
})
export class AdminHeaderComponent {
  private readonly router = inject(Router);
  private readonly demoData = inject(AdminDemoDataService);

  readonly menuToggle = output<void>();

  private readonly pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.readPageTitle()),
    ),
    { initialValue: 'Dashboard' },
  );

  protected readonly title = computed(() => this.pageTitle() ?? 'Dashboard');
  protected readonly newEnquiryCount = this.demoData.newEnquiryCount;

  protected onMenuToggle(): void {
    this.menuToggle.emit();
  }

  private readPageTitle(): string {
    let title = 'Dashboard';
    let current: ActivatedRoute | null = this.router.routerState.root;

    while (current) {
      const pageTitle = current.snapshot?.data?.['pageTitle'] as string | undefined;
      if (pageTitle) {
        title = pageTitle;
      }
      current = current.firstChild;
    }

    return title;
  }
}
