import { Injectable, inject } from '@angular/core';
import { EnquiryFormOption, EnquiryFormValue } from '@ssrk/shared/ui';
import { map, Observable } from 'rxjs';
import {
  CreateEnquiryRequestDto,
  CreateEnquiryResponseDto,
} from './dtos/public-api.dtos';
import { ApiLanguageCode } from './language-code.util';
import { PublicApiClient } from './public-api.client';

@Injectable({ providedIn: 'root' })
export class PublicEnquiryService {
  private readonly api = inject(PublicApiClient);

  getInterestTopics(lang: ApiLanguageCode): Observable<EnquiryFormOption[]> {
    return this.api.getInterestTopics(lang).pipe(
      map((response) =>
        response.items.map((item) => ({
          label: item.label,
          value: item.code,
        })),
      ),
    );
  }

  submitEnquiry(
    value: EnquiryFormValue,
    source: string,
  ): Observable<CreateEnquiryResponseDto> {
    const request: CreateEnquiryRequestDto = {
      institutionCode: value.collegeCode,
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
      email: value.email || null,
      interestCodes: value.interests,
      source,
    };

    return this.api.submitEnquiry(request);
  }
}
