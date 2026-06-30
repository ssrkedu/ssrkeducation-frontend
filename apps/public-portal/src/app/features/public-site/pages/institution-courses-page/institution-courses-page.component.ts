import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { SiteResolverService } from '../../../../core/site-context/site-resolver.service';

@Component({
  selector: 'app-institution-courses-page',
  imports: [RouterLink],
  templateUrl: './institution-courses-page.component.html',
})
export class InstitutionCoursesPageComponent {
  private readonly siteContext = inject(SiteContextService);
  private readonly siteResolver = inject(SiteResolverService);

  protected readonly site = this.siteContext.site;
  protected readonly courses = toSignal(
    this.siteResolver.getCoursesForInstitution(
      this.siteContext.site()?.institutionId ?? '',
    ),
    { initialValue: [] },
  );
}
