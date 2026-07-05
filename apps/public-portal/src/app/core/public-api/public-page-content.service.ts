import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PageContentDto } from './dtos/public-api.dtos';
import { ApiLanguageCode } from './language-code.util';
import { PublicApiClient } from './public-api.client';

@Injectable({ providedIn: 'root' })
export class PublicPageContentService {
  private readonly api = inject(PublicApiClient);

  getPageContent(
    tenantKey: string,
    pageKey: string,
    lang: ApiLanguageCode,
  ): Observable<PageContentDto> {
    return this.api.getPageContent(tenantKey, pageKey, lang);
  }
}
