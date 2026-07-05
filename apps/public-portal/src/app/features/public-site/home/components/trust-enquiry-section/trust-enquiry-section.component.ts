import { Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EnquiryFormComponent, EnquiryFormOption, EnquiryFormValue } from '@ssrk/shared/ui';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';
import { toApiLanguage } from '../../../../../core/public-api/language-code.util';
import { PublicEnquiryService } from '../../../../../core/public-api/public-enquiry.service';
import { SiteLanguage, SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { ApiResponseError, toUserFacingError } from '@ssrk/shared/utils';
import { TrustEnquirySectionContentVm } from '../../models/trust-enquiry-section-content.vm';

@Component({
  selector: 'app-trust-enquiry-section',
  host: { class: 'block w-full min-w-0 max-w-full' },
  imports: [EnquiryFormComponent],
  templateUrl: './trust-enquiry-section.component.html',
})
export class TrustEnquirySectionComponent {
  private readonly enquiryService = inject(PublicEnquiryService);
  private readonly siteLanguage = inject(SiteLanguageService);

  readonly content = input.required<TrustEnquirySectionContentVm>();
  readonly collegeOptions = input.required<EnquiryFormOption[]>();
  readonly source = input('trust_home');

  protected readonly submitting = signal(false);
  protected readonly submitSuccess = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly interestOptions = toSignal(
    toObservable(this.siteLanguage.language).pipe(
      switchMap((language: SiteLanguage) =>
        this.enquiryService.getInterestTopics(toApiLanguage(language)).pipe(
          catchError(() => of<EnquiryFormOption[]>([])),
        ),
      ),
    ),
    { initialValue: [] as EnquiryFormOption[] },
  );

  protected onSubmitted(value: EnquiryFormValue): void {
    this.submitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(null);

    this.enquiryService
      .submitEnquiry(value, this.source())
      .pipe(
        finalize(() => this.submitting.set(false)),
        catchError((error: unknown): Observable<null> => {
          this.submitError.set(
            error instanceof ApiResponseError
              ? error.message
              : toUserFacingError(error),
          );
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (!response) {
          return;
        }

        this.submitSuccess.set(true);
        window.setTimeout(() => this.submitSuccess.set(false), 3000);
      });
  }
}
