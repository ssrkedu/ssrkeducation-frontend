import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AnnouncementTickerComponent,
  HeroCarouselComponent,
  StatsBarComponent,
} from '@ssrk/shared/ui';
import { map } from 'rxjs';
import { InstitutionsApiService } from '../../../institutions/api/institutions-api.service';
import { TrustAboutSectionComponent } from '../../components/trust-about-section/trust-about-section.component';
import { TrustEnquirySectionComponent } from '../../components/trust-enquiry-section/trust-enquiry-section.component';
import { TrustInstitutionsSectionComponent } from '../../components/trust-institutions-section/trust-institutions-section.component';
import { mapInstitutionsToEnquiryCollegeOptions } from '../../mappers/enquiry-college-options.mapper';
import { mapInstitutionsToTrustSectionContent } from '../../mappers/trust-institution-card.mapper';
import { TRUST_ABOUT } from './trust-about.config';
import { TRUST_ANNOUNCEMENTS } from './trust-announcements.config';
import { TRUST_HERO_SLIDES } from './trust-hero.config';
import { TRUST_INSTITUTIONS_SECTION } from './trust-institutions-section.config';
import { TRUST_STATS_BAR } from './trust-stats.config';
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
    ScrollTop,
  ],
  templateUrl: './trust-home-page.component.html',
})
export class TrustHomePageComponent {
  private readonly institutionsApi = inject(InstitutionsApiService);

  protected readonly announcements = TRUST_ANNOUNCEMENTS;
  protected readonly heroSlides = TRUST_HERO_SLIDES;
  protected readonly statsBar = TRUST_STATS_BAR;
  protected readonly about = TRUST_ABOUT;
  protected readonly institutions = toSignal(
    this.institutionsApi
      .getInstitutions()
      .pipe(map((items) => mapInstitutionsToTrustSectionContent(items))),
    {
      initialValue: {
        ...TRUST_INSTITUTIONS_SECTION,
        cards: [],
      },
    },
  );
  protected readonly enquiryCollegeOptions = toSignal(
    this.institutionsApi
      .getInstitutions()
      .pipe(map((items) => mapInstitutionsToEnquiryCollegeOptions(items))),
    { initialValue: [] },
  );
}
