import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  buildTenantSiteUrl,
  formatTenantSiteHost,
} from '../../../../../core/site-context/public-site-url.utils';
import { InstitutionsApiService } from '../../api/institutions-api.service';

@Component({
  selector: 'app-institutions-page',
  templateUrl: './institutions-page.component.html',
})
export class InstitutionsPageComponent {
  private readonly institutionsApi = inject(InstitutionsApiService);

  protected readonly institutions = toSignal(this.institutionsApi.getInstitutions(), {
    initialValue: [],
  });

  protected readonly institutionSiteUrl = buildTenantSiteUrl;
  protected readonly institutionSiteHost = formatTenantSiteHost;
}
