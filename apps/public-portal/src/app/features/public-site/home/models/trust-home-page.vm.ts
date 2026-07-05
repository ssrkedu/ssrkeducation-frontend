import {
  AnnouncementTickerConfig,
  EnquiryFormOption,
  HeroCarouselSlide,
  StatsBarConfig,
} from '@ssrk/shared/ui';
import { TrustAboutContentVm } from './trust-about-content.vm';
import { TrustEnquirySectionContentVm } from './trust-enquiry-section-content.vm';
import { TrustInstitutionsSectionContentVm } from './trust-institution-card.vm';

export type TrustHomePageStatus = 'loading' | 'ready' | 'error';

export interface TrustHomePageVm {
  status: TrustHomePageStatus;
  errorMessage?: string;
  announcements?: AnnouncementTickerConfig;
  heroSlides?: HeroCarouselSlide[];
  statsBar?: StatsBarConfig;
  about?: TrustAboutContentVm;
  enquirySection?: TrustEnquirySectionContentVm;
  institutions?: TrustInstitutionsSectionContentVm;
  enquiryCollegeOptions?: EnquiryFormOption[];
}
