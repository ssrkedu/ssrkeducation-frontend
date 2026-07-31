import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { AuthService } from '../../../../../core/auth/auth.service';
import { ProfileSettingsFormModel } from '../../../../../core/auth/auth.types';
import { CmsLanguageDto } from '../../../cms/api/dtos/cms.dto';
import { CmsLanguageRequirementsService } from '../../../cms/data/cms-language-requirements.service';
import { AdminPageHeaderComponent } from '../../../shared/components/admin-page-header/admin-page-header.component';

type ProfileSettingsFormGroup = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
}>;

@Component({
  selector: 'app-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputText,
    Button,
    Message,
    Checkbox,
    AdminPageHeaderComponent,
  ],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly languageRequirements = inject(CmsLanguageRequirementsService);

  protected readonly isSaving = signal(false);
  protected readonly saveMessage = signal<string | null>(null);
  protected readonly languages = signal<CmsLanguageDto[]>([]);
  protected readonly languageDraft = signal<Record<string, boolean>>({});
  protected readonly isSavingLanguages = signal(false);
  protected readonly languageMessage = signal<string | null>(null);
  protected readonly languageError = signal<string | null>(null);

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

      this.roleLabel.set(this.auth.getRoleLabel(user));
      this.form.reset({ name: user.name, email: user.email });
    });

    this.languageRequirements
      .ensureLoaded()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (items) => this.applyLanguages(items),
        error: () => this.languageError.set('Unable to load language settings.'),
      });
  }

  protected isInvalid(controlName: keyof ProfileSettingsFormModel): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  protected canEditLanguages(): boolean {
    return this.auth.canWriteCms();
  }

  protected setLanguageRequired(code: string, isRequired: boolean): void {
    this.languageDraft.update((current) => ({ ...current, [code]: isRequired }));
  }

  protected saveLanguages(): void {
    if (!this.canEditLanguages()) {
      return;
    }

    this.languageMessage.set(null);
    this.languageError.set(null);
    this.isSavingLanguages.set(true);

    const draft = this.languageDraft();
    this.languageRequirements
      .updateRequirements({
        items: this.languages().map((language) => ({
          languageCode: language.code,
          isRequired: draft[language.code] ?? language.isRequired,
        })),
      })
      .subscribe({
        next: (items) => {
          this.applyLanguages(items);
          this.isSavingLanguages.set(false);
          this.languageMessage.set('Language requirements saved.');
        },
        error: () => {
          this.isSavingLanguages.set(false);
          this.languageError.set('Unable to save language requirements.');
        },
      });
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

  private applyLanguages(items: CmsLanguageDto[]): void {
    this.languages.set(items);
    this.languageDraft.set(
      Object.fromEntries(items.map((language) => [language.code, language.isRequired])),
    );
  }
}
