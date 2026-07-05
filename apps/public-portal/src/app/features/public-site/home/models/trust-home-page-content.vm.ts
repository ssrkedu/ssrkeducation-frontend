import {
  AnnouncementTickerConfig,
  HeroCarouselSlide,
  StatsBarConfig,
} from '@ssrk/shared/ui';
import { TrustAboutContentVm } from './trust-about-content.vm';
import { TrustEnquirySectionContentVm } from './trust-enquiry-section-content.vm';
import { TrustHomeInstitutionsSectionVm } from './trust-home-institutions-section.vm';

export interface PageSeoVm {
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface TrustHomePageContentVm {
  announcements: AnnouncementTickerConfig;
  heroSlides: HeroCarouselSlide[];
  statsBar: StatsBarConfig;
  about: TrustAboutContentVm;
  institutionsSection: TrustHomeInstitutionsSectionVm;
  enquirySection: TrustEnquirySectionContentVm;
  seo: PageSeoVm;
}
