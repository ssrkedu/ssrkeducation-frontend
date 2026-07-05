import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { LoaderComponent, SsrkCardComponent } from '@ssrk/shared/ui';
import { catchError, concat, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { toApiLanguage } from '../../../../../core/public-api/language-code.util';
import { PublicPageContentService } from '../../../../../core/public-api/public-page-content.service';
import { SiteLanguage, SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { mapTrustInstitutionsPageContentVm } from '../../../home/mappers/trust-home-page-content.mapper';
import { mapInstitutionToCardPresentationVm } from '../../../home/mappers/trust-institution-card.mapper';
import { resolveInstitutionSiteUrl } from '../../../../../core/site-context/public-site-url.utils';
import { InstitutionsApiService } from '../../api/institutions-api.service';
import { InstitutionsPageVm } from '../../models/institutions-page.vm';

@Component({
  selector: 'app-institutions-page',
  imports: [SsrkCardComponent, LoaderComponent],
  templateUrl: './institutions-page.component.html',
})
export class InstitutionsPageComponent {
  private readonly institutionsApi = inject(InstitutionsApiService);
  private readonly pageContent = inject(PublicPageContentService);
  private readonly siteLanguage = inject(SiteLanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly viewModel = toSignal(
    toObservable(this.siteLanguage.language).pipe(
      switchMap((language: SiteLanguage) =>
        concat(
          of<InstitutionsPageVm>({ status: 'loading' }),
          forkJoin({
            page: this.pageContent
              .getPageContent('trust', 'institutions', toApiLanguage(language))
              .pipe(map(mapTrustInstitutionsPageContentVm)),
            institutions: this.institutionsApi.getInstitutions(
              'trust',
              toApiLanguage(language),
            ),
          }).pipe(
            tap(({ page }) => {
              if (page.seo.metaTitle) {
                this.title.setTitle(page.seo.metaTitle);
              }

              if (page.seo.metaDescription) {
                this.meta.updateTag({
                  name: 'description',
                  content: page.seo.metaDescription,
                });
              }
            }),
            map(
              ({ page, institutions }): InstitutionsPageVm => ({
                status: 'ready',
                sectionLabel: page.content.sectionLabel,
                title: page.content.title,
                description: page.content.description,
                cardCtaLabel: page.content.cardCtaLabel,
                institutions,
              }),
            ),
            catchError(
              (): Observable<InstitutionsPageVm> =>
                of({
                  status: 'error',
                  errorMessage:
                    'Unable to load institutions page content. Please try again later.',
                }),
            ),
          ),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as InstitutionsPageVm },
  );

  protected readonly institutionCards = computed(() => {
    const page = this.viewModel();
    const institutions = page.institutions ?? [];

    return institutions.map((institution) => ({
      institution,
      siteUrl: resolveInstitutionSiteUrl(institution.subdomain),
      presentation: mapInstitutionToCardPresentationVm(institution),
      ctaLabel: page.cardCtaLabel ?? 'Visit College site',
    }));
  });
}
