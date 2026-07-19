import { afterNextRender, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import {
  AnnouncementTickerComponent,
  HeroCarouselComponent,
  LoaderComponent,
} from '@ssrk/shared/ui';
import {
  catchError,
  concat,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { toApiLanguage } from '../../../../../core/public-api/language-code.util';
import { PublicPageContentService } from '../../../../../core/public-api/public-page-content.service';
import {
  SiteLanguage,
  SiteLanguageService,
} from '../../../../../core/site-context/site-language.service';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { clearMisplacedEnquiryHash } from '../../../../../core/site-context/enquiry-deep-link.util';
import { InstitutionCatalogApiService } from '../../../catalog/api/institution-catalog-api.service';
import { InstitutionCoursesSectionComponent } from '../../components/institution-courses-section/institution-courses-section.component';
import { InstitutionOverviewSectionComponent } from '../../components/institution-overview-section/institution-overview-section.component';
import { InstitutionScholarshipsSectionComponent } from '../../components/institution-scholarships-section/institution-scholarships-section.component';
import { mapInstitutionHomePageContentVm } from '../../mappers/institution-home-page-content.mapper';
import { InstitutionHomePageVm } from '../../models/institution-home-page.vm';
import { buildTrustEnquiryUrl } from '../../utils/trust-enquiry-url.util';

@Component({
  selector: 'app-institution-home-page',
  host: { class: 'block w-full min-w-0 max-w-full' },
  imports: [
    AnnouncementTickerComponent,
    HeroCarouselComponent,
    InstitutionOverviewSectionComponent,
    InstitutionCoursesSectionComponent,
    InstitutionScholarshipsSectionComponent,
    LoaderComponent,
  ],
  templateUrl: './institution-home-page.component.html',
})
export class InstitutionHomePageComponent {
  private readonly pageContent = inject(PublicPageContentService);
  private readonly catalogApi = inject(InstitutionCatalogApiService);
  private readonly siteContext = inject(SiteContextService);
  private readonly siteLanguage = inject(SiteLanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    afterNextRender(() => clearMisplacedEnquiryHash());
  }

  protected readonly applyNowUrl = buildTrustEnquiryUrl(
    this.siteContext.site()?.tenantKey,
  );

  protected readonly viewModel = toSignal(
    toObservable(this.siteLanguage.language).pipe(
      switchMap((language: SiteLanguage) => {
        const tenantKey = this.siteContext.site()?.tenantKey;

        if (!tenantKey) {
          return of<InstitutionHomePageVm>({
            status: 'error',
            errorMessage: 'Institution site is not configured.',
          });
        }

        const lang = toApiLanguage(language);

        return concat(
          of<InstitutionHomePageVm>({ status: 'loading' }),
          forkJoin({
            home: this.pageContent.getPageContent(tenantKey, 'home', lang),
            courses: this.catalogApi.getCourses(tenantKey, lang),
            scholarships: this.catalogApi.getScholarships(tenantKey, lang),
          }).pipe(
            map(({ home, courses, scholarships }): InstitutionHomePageVm => {
              const content = mapInstitutionHomePageContentVm(
                home,
                courses,
                scholarships,
                tenantKey,
              );

              if (content.seo.metaTitle) {
                this.title.setTitle(content.seo.metaTitle);
              }

              if (content.seo.metaDescription) {
                this.meta.updateTag({
                  name: 'description',
                  content: content.seo.metaDescription,
                });
              }

              return {
                status: 'ready',
                announcements: content.announcements,
                heroSlides: content.heroSlides,
                overview: content.overview,
                coursesSection: content.coursesSection,
                scholarshipsSection: content.scholarshipsSection,
              };
            }),
            catchError(
              (): Observable<InstitutionHomePageVm> =>
                of({
                  status: 'error',
                  errorMessage:
                    'Unable to load institution page content. Please try again later.',
                }),
            ),
          ),
        );
      }),
    ),
    { initialValue: { status: 'loading' } as InstitutionHomePageVm },
  );
}
