import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiResponse } from '@ssrk/shared/types';
import { unwrapApiResponse } from '@ssrk/shared/utils';
import { Observable, of, map, tap } from 'rxjs';
import { API_ROUTES } from '../../../../core/api/api.routes';
import { buildApiUrl } from '../../../../core/api/build-api-url';
import { CmsLanguageDto } from '../api/dtos/cms.dto';
import { UpdateCmsLanguageRequirementsRequest } from '../api/requests/cms.requests';

@Injectable({ providedIn: 'root' })
export class CmsLanguageRequirementsService {
  private readonly http = inject(HttpClient);

  private readonly languagesSignal = signal<CmsLanguageDto[]>([]);
  private loaded = false;

  readonly languages = this.languagesSignal.asReadonly();
  readonly requiredCodes = computed(() =>
    this.languagesSignal()
      .filter((language) => language.isRequired)
      .map((language) => language.code),
  );

  ensureLoaded(): Observable<CmsLanguageDto[]> {
    if (this.loaded && this.languagesSignal().length > 0) {
      return of(this.languagesSignal());
    }

    return this.refresh();
  }

  refresh(): Observable<CmsLanguageDto[]> {
    return this.http
      .get<ApiResponse<CmsLanguageDto[]>>(buildApiUrl(API_ROUTES.admin.cms.languages))
      .pipe(
        map(unwrapApiResponse),
        tap((languages) => {
          this.languagesSignal.set(languages);
          this.loaded = true;
        }),
      );
  }

  updateRequirements(
    request: UpdateCmsLanguageRequirementsRequest,
  ): Observable<CmsLanguageDto[]> {
    return this.http
      .put<ApiResponse<CmsLanguageDto[]>>(
        buildApiUrl(API_ROUTES.admin.cms.languageRequirements),
        request,
      )
      .pipe(
        map(unwrapApiResponse),
        tap((languages) => {
          this.languagesSignal.set(languages);
          this.loaded = true;
        }),
      );
  }

  isRequired(languageCode: string): boolean {
    return this.requiredCodes().includes(languageCode);
  }

  requiredLabel(languageCode: string, baseLabel: string): string {
    return this.isRequired(languageCode) ? `${baseLabel} (required)` : baseLabel;
  }

  missingRequiredNameMessage(namesByCode: Record<string, string | null | undefined>): string | null {
    for (const language of this.languagesSignal().filter((item) => item.isRequired)) {
      if (!namesByCode[language.code]?.trim()) {
        return `${language.name} translation is required.`;
      }
    }
    return null;
  }

  missingRequiredSeoMessage(
    titlesByCode: Record<string, { title?: string; metaTitle?: string | null }>,
  ): string | null {
    for (const language of this.languagesSignal().filter((item) => item.isRequired)) {
      const entry = titlesByCode[language.code];
      if (!entry?.title?.trim() && !entry?.metaTitle?.trim()) {
        return `${language.name} title or meta title is required.`;
      }
    }
    return null;
  }
}
