import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { startWith } from 'rxjs';
import {
  DEFAULT_ENQUIRY_INTEREST_OPTIONS,
  EnquiryFormOption,
  EnquiryFormValue,
} from './enquiry-form.types';

type EnquiryFormGroup = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  collegeCode: FormControl<string>;
  interests: FormControl<string[]>;
}>;

@Component({
  selector: 'app-enquiry-form',
  imports: [ReactiveFormsModule, InputText, Select, MultiSelect, Chip, Button],
  templateUrl: './enquiry-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnquiryFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly title = input('Quick Enquiry');
  readonly submitLabel = input('Submit Enquiry');
  readonly privacyNote = input('We respect your privacy. No spam calls.');
  readonly collegeOptions = input.required<EnquiryFormOption[]>();
  readonly interestOptions = input<EnquiryFormOption[]>(
    DEFAULT_ENQUIRY_INTEREST_OPTIONS,
  );
  readonly submitting = input(false);

  readonly submitted = output<EnquiryFormValue>();

  protected readonly submitSuccess = signal(false);

  protected readonly form: EnquiryFormGroup = this.fb.group({
    firstName: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(80)],
    }),
    lastName: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(80)],
    }),
    phone: this.fb.control('', {
      validators: [Validators.required, Validators.pattern(/^[0-9+\s()-]{10,15}$/)],
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(120)],
    }),
    collegeCode: this.fb.control('', { validators: [Validators.required] }),
    interests: this.fb.control<string[]>([], {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  private readonly selectedInterestValues = toSignal(
    this.form.controls.interests.valueChanges.pipe(
      startWith(this.form.controls.interests.value),
    ),
    { initialValue: [] as string[] },
  );

  protected readonly selectedInterestPills = computed(() => {
    const options = this.interestOptions();
    return this.selectedInterestValues()
      .map((value) => options.find((option) => option.value === value))
      .filter((option): option is EnquiryFormOption => option !== undefined);
  });

  protected removeInterest(value: string, event: MouseEvent): void {
    event.preventDefault();
    const interests = this.form.controls.interests.value.filter((item) => item !== value);
    this.form.controls.interests.setValue(interests);
    this.form.controls.interests.markAsDirty();
    this.form.controls.interests.markAsTouched();
  }

  protected isInvalid(controlName: keyof EnquiryFormValue): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected onSubmit(): void {
    this.submitSuccess.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.emit(value);
    this.submitSuccess.set(true);
    this.form.reset({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      collegeCode: '',
      interests: [],
    });

    window.setTimeout(() => this.submitSuccess.set(false), 2500);
  }
}
