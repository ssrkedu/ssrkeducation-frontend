import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  buildTenantSiteUrl,
  formatTenantSiteHost,
} from '../../../../core/site-context/public-site-url.utils';
import { SiteResolverService } from '../../../../core/site-context/site-resolver.service';

@Component({
  selector: 'app-institutions-page',
  templateUrl: './institutions-page.component.html',
})
export class InstitutionsPageComponent {
  private readonly siteResolver = inject(SiteResolverService);

  protected readonly institutions = toSignal(this.siteResolver.getInstitutions(), {
    initialValue: [],
  });

  protected readonly institutionSiteUrl = buildTenantSiteUrl;
  protected readonly institutionSiteHost = formatTenantSiteHost;
}
