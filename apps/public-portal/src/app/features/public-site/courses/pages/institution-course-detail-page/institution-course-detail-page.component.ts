import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { SiteResolverService } from '../../../../../core/site-context/site-resolver.service';

@Component({
  selector: 'app-institution-course-detail-page',
  imports: [RouterLink],
  templateUrl: './institution-course-detail-page.component.html',
})
export class InstitutionCourseDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly siteContext = inject(SiteContextService);
  private readonly siteResolver = inject(SiteResolverService);

  protected readonly site = this.siteContext.site;
  protected readonly course = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('courseSlug') ?? ''),
      switchMap((courseSlug) =>
        this.siteResolver.getCourseBySlug(
          this.siteContext.site()?.institutionId ?? '',
          courseSlug,
        ),
      ),
    ),
    { initialValue: null },
  );
}
