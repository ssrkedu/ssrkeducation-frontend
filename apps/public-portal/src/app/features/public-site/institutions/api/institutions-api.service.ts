import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InstitutionItemDto } from '../../../../core/public-api/dtos/public-api.dtos';
import { ApiLanguageCode } from '../../../../core/public-api/language-code.util';
import { PublicApiClient } from '../../../../core/public-api/public-api.client';
import { InstitutionSummaryDto } from './dtos/institution-summary.dto';

@Injectable({ providedIn: 'root' })
export class InstitutionsApiService {
  private readonly api = inject(PublicApiClient);

  getInstitutions(
    tenantKey = 'trust',
    lang: ApiLanguageCode,
  ): Observable<InstitutionSummaryDto[]> {
    return this.api.getInstitutions(tenantKey, lang).pipe(
      map((response) =>
        [...response.items]
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .map(mapInstitutionItem),
      ),
    );
  }
}

function mapInstitutionItem(item: InstitutionItemDto): InstitutionSummaryDto {
  return {
    id: item.id,
    code: item.code,
    slug: item.slug,
    subdomain: item.subdomain,
    name: item.name,
    shortName: item.shortName,
    description: item.description,
    logoUrl: item.logoUrl,
    primaryColor: item.primaryColor,
    coursesLine: item.coursesLine,
    programsLine: item.programsLine,
    iconKey: item.iconKey,
    iconBackgroundColor: item.iconBackgroundColor,
    iconStrokeColor: item.iconStrokeColor,
    sortOrder: item.sortOrder,
    href: item.href,
  };
}
