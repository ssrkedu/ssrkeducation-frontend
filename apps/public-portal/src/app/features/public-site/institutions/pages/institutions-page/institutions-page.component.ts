import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SsrkCardComponent } from '@ssrk/shared/ui';
import { buildTenantSiteUrl } from '../../../../../core/site-context/public-site-url.utils';
import { getInstitutionCardPresentation } from '../../../home/mappers/trust-institution-card.mapper';
import { InstitutionsApiService } from '../../api/institutions-api.service';

@Component({
  selector: 'app-institutions-page',
  imports: [SsrkCardComponent],
  templateUrl: './institutions-page.component.html',
})
export class InstitutionsPageComponent {
  private readonly institutionsApi = inject(InstitutionsApiService);

  protected readonly institutions = toSignal(this.institutionsApi.getInstitutions(), {
    initialValue: [],
  });

  protected readonly institutionCards = computed(() =>
    this.institutions().map((institution) => ({
      institution,
      siteUrl: buildTenantSiteUrl(institution.subdomain),
      presentation: getInstitutionCardPresentation(institution.code),
    })),
  );
}
