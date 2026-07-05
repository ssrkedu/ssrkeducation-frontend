import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import {
  AnnouncementTickerComponent,
  HeroCarouselComponent,
  LoaderComponent,
  StatsBarComponent,
} from '@ssrk/shared/ui';
import { catchError, concat, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { toApiLanguage } from '../../../../../core/public-api/language-code.util';
import { PublicPageContentService } from '../../../../../core/public-api/public-page-content.service';
import { SiteLanguage, SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { InstitutionsApiService } from '../../../institutions/api/institutions-api.service';
import { TrustAboutSectionComponent } from '../../components/trust-about-section/trust-about-section.component';
import { TrustEnquirySectionComponent } from '../../components/trust-enquiry-section/trust-enquiry-section.component';
import { TrustInstitutionsSectionComponent } from '../../components/trust-institutions-section/trust-institutions-section.component';
import { mapInstitutionsToEnquiryCollegeOptions } from '../../mappers/enquiry-college-options.mapper';
import { mapPageToTrustHomeContentVm } from '../../mappers/trust-home-page-content.mapper';
import { mapInstitutionsToTrustSectionContentVm } from '../../mappers/trust-institution-card.mapper';
import { TrustHomePageVm } from '../../models/trust-home-page.vm';
import { ScrollTop } from 'primeng/scrolltop';

@Component({
  selector: 'app-trust-home-page',
  host: { class: 'block w-full min-w-0 max-w-full' },
  imports: [
    AnnouncementTickerComponent,
    HeroCarouselComponent,
    StatsBarComponent,
    TrustAboutSectionComponent,
    TrustInstitutionsSectionComponent,
    TrustEnquirySectionComponent,
    LoaderComponent,
    ScrollTop,
  ],
  templateUrl: './trust-home-page.component.html',
})
export class TrustHomePageComponent {
  private readonly pageContent = inject(PublicPageContentService);
  private readonly institutionsApi = inject(InstitutionsApiService);
  private readonly siteLanguage = inject(SiteLanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly viewModel = toSignal(
    toObservable(this.siteLanguage.language).pipe(
      switchMap((language: SiteLanguage) =>
        concat(
          of<TrustHomePageVm>({ status: 'loading' }),
          forkJoin({
            home: this.pageContent
              .getPageContent('trust', 'home', toApiLanguage(language))
              .pipe(map(mapPageToTrustHomeContentVm)),
            institutions: this.institutionsApi.getInstitutions(
              'trust',
              toApiLanguage(language),
            ),
          }).pipe(
            tap(({ home }) => {
              if (home.seo.metaTitle) {
                this.title.setTitle(home.seo.metaTitle);
              }

              if (home.seo.metaDescription) {
                this.meta.updateTag({
                  name: 'description',
                  content: home.seo.metaDescription,
                });
              }
            }),
            map(
              ({ home, institutions }): TrustHomePageVm => ({
                status: 'ready',
                announcements: home.announcements,
                heroSlides: home.heroSlides,
                statsBar: home.statsBar,
                about: home.about,
                enquirySection: home.enquirySection,
                institutions: mapInstitutionsToTrustSectionContentVm(
                  institutions,
                  home.institutionsSection,
                ),
                enquiryCollegeOptions: mapInstitutionsToEnquiryCollegeOptions(
                  institutions,
                ),
              }),
            ),
            catchError(
              (): Observable<TrustHomePageVm> =>
                of({
                  status: 'error',
                  errorMessage:
                    'Unable to load home page content. Please try again later.',
                }),
            ),
          ),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as TrustHomePageVm },
  );
}
