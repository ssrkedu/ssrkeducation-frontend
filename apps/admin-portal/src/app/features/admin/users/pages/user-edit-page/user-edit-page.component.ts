import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toUserFacingError } from '@ssrk/shared/utils';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { map, of, switchMap } from 'rxjs';
import { UsersApiService } from '../../api/users-api.service';
import { mapAdminUserDetailDtoToVm } from '../../mappers/user.mapper';
import {
  buildPermissionCodes,
  readPermissionGroups,
} from '../../utils/user-permissions.util';

@Component({
  selector: 'app-user-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, Checkbox, InputText, Password],
  templateUrl: './user-edit-page.component.html',
})
export class UserEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly usersApi = inject(UsersApiService);

  private readonly userId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );

  protected readonly fullName = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly contentManagement = signal(false);
  protected readonly enquiryManagement = signal(false);
  protected readonly accountActive = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly saving = signal(false);

  protected readonly isNewUser = computed(() => this.userId() === 'new');

  protected readonly pageTitle = computed(() => {
    if (this.isNewUser()) return 'New User';
    const name = this.fullName().trim();
    return name ? `Edit ${name}` : 'Edit User';
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (!id || id === 'new') {
            return of(null);
          }

          return this.usersApi.getById(id);
        }),
        takeUntilDestroyed(),
      )
      .subscribe((dto) => {
        if (!dto) return;

        const user = mapAdminUserDetailDtoToVm(dto);
        this.fullName.set(user.name);
        this.email.set(user.email);
        this.accountActive.set(user.active);

        const groups = readPermissionGroups(user.permissions);
        this.contentManagement.set(groups.contentManagement);
        this.enquiryManagement.set(groups.enquiryManagement);
      });
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/users');
  }

  protected saveUser(): void {
    this.errorMessage.set('');
    this.saving.set(true);

    const id = this.userId();
    const email = this.email().trim();
    const fullName = this.fullName().trim();
    const permissionCodes = buildPermissionCodes(
      this.contentManagement(),
      this.enquiryManagement(),
    );

    if (id && id !== 'new') {
      this.usersApi
        .update(id, { email, fullName })
        .subscribe({
          next: () => {
            this.usersApi.setPermissions(id, { permissionCodes }).subscribe({
              next: () => {
                this.usersApi
                  .setStatus(id, { isActive: this.accountActive() })
                  .subscribe({
                    next: () => {
                      this.saving.set(false);
                      void this.router.navigateByUrl('/users');
                    },
                    error: (error) => {
                      this.saving.set(false);
                      this.errorMessage.set(toUserFacingError(error));
                    },
                  });
              },
              error: (error) => {
                this.saving.set(false);
                this.errorMessage.set(toUserFacingError(error));
              },
            });
          },
          error: (error) => {
            this.saving.set(false);
            this.errorMessage.set(toUserFacingError(error));
          },
        });
      return;
    }

    const password = this.password();
    this.usersApi
      .create({
        email,
        fullName,
        authMethod: 'password',
        password,
        permissionCodes,
      })
      .subscribe({
        next: (created) => {
          this.usersApi.setStatus(created.id, { isActive: this.accountActive() }).subscribe({
            next: () => {
              this.saving.set(false);
              void this.router.navigateByUrl('/users');
            },
            error: (error) => {
              this.saving.set(false);
              this.errorMessage.set(toUserFacingError(error));
            },
          });
        },
        error: (error) => {
          this.saving.set(false);
          this.errorMessage.set(toUserFacingError(error));
        },
      });
  }
}
