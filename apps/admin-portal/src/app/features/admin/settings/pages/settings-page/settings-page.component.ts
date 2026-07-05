import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../../../../core/auth/auth.service';
import { ProfileSettingsFormModel } from '../../../../../core/auth/auth.types';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';

type ProfileSettingsFormGroup = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
}>;

@Component({
  selector: 'app-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputText, Button, AdminPageHeaderComponent],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);

  protected readonly isSaving = signal(false);
  protected readonly saveMessage = signal<string | null>(null);

  protected readonly form: ProfileSettingsFormGroup = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.maxLength(120)] }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(120)],
    }),
  });

  protected readonly roleLabel = signal('Guest');

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      if (!user) {
        this.roleLabel.set('Guest');
        this.form.reset({ name: '', email: '' });
        return;
      }

      this.roleLabel.set(user.role === 'super_admin' ? 'Super Admin' : 'Admin');
      this.form.reset({ name: user.name, email: user.email });
    });
  }

  protected isInvalid(controlName: keyof ProfileSettingsFormModel): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    this.saveMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.auth.updateProfile(this.form.getRawValue());
    this.saveMessage.set('Profile updated successfully.');
    this.isSaving.set(false);
  }
}
