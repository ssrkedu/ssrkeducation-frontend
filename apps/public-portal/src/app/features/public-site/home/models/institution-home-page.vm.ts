import { HeroCarouselSlide } from '@ssrk/shared/ui';
import {
  InstitutionCoursesSectionVm,
  InstitutionOverviewVm,
  InstitutionScholarshipsSectionVm,
} from './institution-home-page-content.vm';

export interface InstitutionHomePageVm {
  status: 'loading' | 'ready' | 'error';
  heroSlides?: HeroCarouselSlide[];
  overview?: InstitutionOverviewVm;
  coursesSection?: InstitutionCoursesSectionVm;
  scholarshipsSection?: InstitutionScholarshipsSectionVm;
  errorMessage?: string;
}
