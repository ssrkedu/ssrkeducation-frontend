import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { map } from 'rxjs';
import { AdminDemoDataService } from '../../../data/admin-demo.service';

@Component({
  selector: 'app-user-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, Checkbox, InputText, Password],
  templateUrl: './user-edit-page.component.html',
})
export class UserEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly demoData = inject(AdminDemoDataService);

  private readonly userId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 },
  );

  protected readonly contentManagement = signal(false);
  protected readonly enquiryManagement = signal(true);
  protected readonly accountActive = signal(true);

  protected readonly pageTitle = computed(() => {
    const id = this.userId();
    if (!id) return 'New User';

    const user = this.demoData.users().find((item) => item.id === id);
    return user ? `Edit ${user.name}` : 'Edit User';
  });

  constructor() {
    const id = this.userId();
    if (id > 0) {
      const user = this.demoData.users().find((item) => item.id === id);
      if (user) {
        this.contentManagement.set(user.permissions.includes('content_management'));
        this.enquiryManagement.set(user.permissions.includes('enquiry_management'));
        this.accountActive.set(user.active);
      }
    }
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/users');
  }

  protected saveUser(): void {
    window.alert('User saved! (demo)');
  }
}
