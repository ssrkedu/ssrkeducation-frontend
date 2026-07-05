export interface InstitutionCourseCardVm {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  eligibility: string | null;
  feeDisplayText: string | null;
}

export interface InstitutionScholarshipCardVm {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  benefit: string | null;
  appliesToAllCourses: boolean;
  courseSlugs: string[];
}

export interface InstitutionSectionIntroVm {
  sectionLabel: string;
  title: string;
  description: string;
}

export interface InstitutionOverviewVm extends InstitutionSectionIntroVm {}

export interface InstitutionCoursesSectionVm extends InstitutionSectionIntroVm {
  courses: InstitutionCourseCardVm[];
}

export interface InstitutionScholarshipsSectionVm extends InstitutionSectionIntroVm {
  scholarships: InstitutionScholarshipCardVm[];
}

export interface InstitutionHomePageContentVm {
  heroSlides: import('@ssrk/shared/ui').HeroCarouselSlide[];
  overview: InstitutionOverviewVm;
  coursesSection: InstitutionCoursesSectionVm;
  scholarshipsSection: InstitutionScholarshipsSectionVm;
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  };
}
