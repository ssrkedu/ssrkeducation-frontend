import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { PublicPageKey } from '../../core/site-context/site-context.model';
import { SiteContextService } from '../../core/site-context/site-context.service';

export const trustSiteGuard: CanMatchFn = () =>
  inject(SiteContextService).isTrustSite();

export const institutionSiteGuard: CanMatchFn = () =>
  inject(SiteContextService).isInstitutionSite();

export function institutionPageGuard(page: PublicPageKey): CanMatchFn {
  return () => {
    const siteContext = inject(SiteContextService);
    const router = inject(Router);

    if (!siteContext.isInstitutionSite()) {
      return false;
    }

    if (!siteContext.isPageEnabled(page)) {
      void router.navigateByUrl('/');
      return false;
    }

    return true;
  };
}
