import { AnnouncementTickerConfig, HeroCarouselSlide } from '@ssrk/shared/ui';
import { getInstitutionHeroPreview } from '../../../../core/config/public-site/institution/institution-hero.config';
import { buildTrustEnquiryUrl } from '../../../../core/site-context/public-site-url.utils';
import {
  CourseItemDto,
  PageContentDto,
  PageContentSectionDto,
  ScholarshipItemDto,
} from '../../../../core/public-api/dtos/public-api.dtos';
import { AnnouncementsSectionPayloadDto } from '../../../../core/public-api/dtos/home-section-payloads.dto';
import {
  InstitutionCoursesIntroSectionPayloadDto,
  InstitutionHeroSectionPayloadDto,
  InstitutionOverviewSectionPayloadDto,
  InstitutionScholarshipsIntroSectionPayloadDto,
} from '../../../../core/public-api/dtos/institution-section-payloads.dto';
import {
  InstitutionCourseCardVm,
  InstitutionHomePageContentVm,
  InstitutionScholarshipCardVm,
} from '../models/institution-home-page-content.vm';

export function mapInstitutionHomePageContentVm(
  page: PageContentDto,
  courses: CourseItemDto[],
  scholarships: ScholarshipItemDto[],
  tenantKey: string,
): InstitutionHomePageContentVm {
  return {
    announcements: mapAnnouncementsVm(
      getSectionPayload<AnnouncementsSectionPayloadDto>(
        page.sections,
        'announcements',
      ),
    ),
    heroSlides: mapHeroSlides(
      getSectionPayload<InstitutionHeroSectionPayloadDto>(page.sections, 'hero'),
      tenantKey,
    ),
    overview: mapOverviewVm(
      getSectionPayload<InstitutionOverviewSectionPayloadDto>(
        page.sections,
        'overview',
      ),
    ),
    coursesSection: {
      ...mapCoursesIntroVm(
        getSectionPayload<InstitutionCoursesIntroSectionPayloadDto>(
          page.sections,
          'courses_intro',
        ),
      ),
      courses: mapCourseCards(courses),
    },
    scholarshipsSection: {
      ...mapScholarshipsIntroVm(
        getSectionPayload<InstitutionScholarshipsIntroSectionPayloadDto>(
          page.sections,
          'scholarships_intro',
        ),
      ),
      scholarships: mapScholarshipCards(scholarships),
    },
    seo: {
      metaTitle: page.page.seo.metaTitle,
      metaDescription: page.page.seo.metaDescription,
    },
  };
}

function getSectionPayload<T>(
  sections: PageContentSectionDto[],
  key: string,
): T {
  const section = sections.find((item) => item.sectionKey === key);
  return (section?.payload ?? {}) as T;
}

function mapAnnouncementsVm(
  payload: AnnouncementsSectionPayloadDto,
): AnnouncementTickerConfig {
  return {
    label: payload.label ?? 'LATEST',
    ariaLabel: payload.ariaLabel ?? 'Latest announcements',
    items: (payload.items ?? []).map((item) => ({
      id: item.id,
      text: item.text,
    })),
  };
}

function mapHeroSlides(
  payload: InstitutionHeroSectionPayloadDto,
  tenantKey: string,
): HeroCarouselSlide[] {
  const preview = getInstitutionHeroPreview(tenantKey);
  const enquireUrl = buildTrustEnquiryUrl(tenantKey);

  // Local preview for ssrkdc: one official campus image, no collage/carousel.
  if (preview) {
    return [
      {
        ...preview,
        secondaryAction: {
          label: preview.secondaryAction?.label ?? 'Enquire Now',
          href: enquireUrl ?? preview.secondaryAction?.href ?? '#enquiry',
          variant: 'outline',
        },
      },
    ];
  }

  if (!payload.title) {
    return [];
  }

  return [
    {
      id: 'hero',
      badge: payload.badge ?? 'Admissions Open',
      title: payload.title,
      description: payload.description ?? '',
      backgroundImage: payload.imageUrl,
      theme: 'institution',
      primaryAction: {
        label: payload.applyNowLabel ?? 'Apply Now',
        href: enquireUrl ?? '#featured-courses',
        variant: 'primary',
      },
      secondaryAction: {
        label: 'Explore Programmes',
        href: '#featured-courses',
        variant: 'outline',
      },
    },
  ];
}

function mapOverviewVm(payload: InstitutionOverviewSectionPayloadDto) {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    description: payload.description ?? '',
  };
}

function mapCoursesIntroVm(payload: InstitutionCoursesIntroSectionPayloadDto) {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    description: payload.description ?? '',
  };
}

function mapScholarshipsIntroVm(
  payload: InstitutionScholarshipsIntroSectionPayloadDto,
) {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    description: payload.description ?? '',
  };
}

function mapCourseCards(courses: CourseItemDto[]): InstitutionCourseCardVm[] {
  return [...courses]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((course) => ({
      id: course.id,
      slug: course.slug,
      name: course.name,
      summary: course.summary,
      eligibility: course.eligibility,
      feeDisplayText: course.feeDisplayText,
    }));
}

function mapScholarshipCards(
  scholarships: ScholarshipItemDto[],
): InstitutionScholarshipCardVm[] {
  return [...scholarships]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((scholarship) => ({
      id: scholarship.id,
      slug: scholarship.slug,
      name: scholarship.name,
      summary: scholarship.summary,
      benefit: scholarship.benefit,
      appliesToAllCourses: scholarship.appliesToAllCourses,
      courseSlugs: scholarship.courseSlugs,
      checkEligibilityUrl: scholarship.checkEligibilityUrl,
      moreInfoUrl: scholarship.moreInfoUrl,
    }));
}
