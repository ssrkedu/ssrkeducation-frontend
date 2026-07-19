import { afterNextRender, Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { EnquiryFormComponent, EnquiryFormOption, EnquiryFormValue } from '@ssrk/shared/ui';
import { ApiResponseError, toUserFacingError } from '@ssrk/shared/utils';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { scrollToEnquiryWhenReady } from '../../../../../core/site-context/enquiry-deep-link.util';
import { toApiLanguage } from '../../../../../core/public-api/language-code.util';
import { PublicEnquiryService } from '../../../../../core/public-api/public-enquiry.service';
import { SiteLanguage, SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { TrustEnquirySectionContentVm } from '../../models/trust-enquiry-section-content.vm';

@Component({
  selector: 'app-trust-enquiry-section',
  host: { class: 'block w-full min-w-0 max-w-full' },
  imports: [EnquiryFormComponent],
  templateUrl: './trust-enquiry-section.component.html',
})
export class TrustEnquirySectionComponent {
  private readonly enquiryService = inject(PublicEnquiryService);
  private readonly messageService = inject(MessageService);
  private readonly siteLanguage = inject(SiteLanguageService);
  private readonly route = inject(ActivatedRoute);

  readonly content = input.required<TrustEnquirySectionContentVm>();
  readonly collegeOptions = input.required<EnquiryFormOption[]>();
  readonly source = input('trust_home');

  protected readonly submitting = signal(false);
  protected readonly submitSuccess = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly initialCollegeCode = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('institution') ?? '')),
    { initialValue: '' },
  );

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

  constructor() {
    afterNextRender(() => scrollToEnquiryWhenReady());
  }

  protected onSubmitted(value: EnquiryFormValue): void {
    this.submitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(null);

    this.enquiryService
      .submitEnquiry(value, this.source())
      .pipe(
        finalize(() => this.submitting.set(false)),
        catchError((error: unknown): Observable<null> => {
          const detail =
            error instanceof ApiResponseError
              ? error.message
              : toUserFacingError(error);

          this.submitError.set(detail);
          this.messageService.add({
            severity: 'error',
            summary: 'Enquiry failed',
            detail,
            life: 6000,
          });
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (!response) {
          return;
        }

        this.submitSuccess.set(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Enquiry submitted',
          detail: 'Thank you. Our admissions team will contact you soon.',
          life: 5000,
        });
        window.setTimeout(() => this.submitSuccess.set(false), 3000);
      });
  }
}
