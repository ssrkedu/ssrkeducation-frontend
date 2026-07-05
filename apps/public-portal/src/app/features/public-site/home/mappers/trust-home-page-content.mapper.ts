import { AnnouncementTickerConfig } from '@ssrk/shared/ui';
import { PageContentDto, PageContentSectionDto } from '../../../../core/public-api/dtos/public-api.dtos';
import {
  AboutSectionPayloadDto,
  AnnouncementsSectionPayloadDto,
  EnquirySectionPayloadDto,
  HeroSectionPayloadDto,
  HomeInstitutionsSectionPayloadDto,
  InstitutionsPageSectionPayloadDto,
  StatsSectionPayloadDto,
} from '../../../../core/public-api/dtos/home-section-payloads.dto';
import { TrustAboutContentVm } from '../models/trust-about-content.vm';
import { TrustEnquirySectionContentVm } from '../models/trust-enquiry-section-content.vm';
import {
  PageSeoVm,
  TrustHomePageContentVm,
} from '../models/trust-home-page-content.vm';
import { TrustHomeInstitutionsSectionVm } from '../models/trust-home-institutions-section.vm';
import { InstitutionsPageContentVm } from '../../institutions/models/institutions-page-content.vm';

export function mapPageToTrustHomeContentVm(
  page: PageContentDto,
): TrustHomePageContentVm {
  return {
    announcements: mapAnnouncementsVm(
      getSectionPayload<AnnouncementsSectionPayloadDto>(
        page.sections,
        'announcements',
      ),
    ),
    heroSlides: mapHeroVm(
      getSectionPayload<HeroSectionPayloadDto>(page.sections, 'hero'),
    ),
    statsBar: mapStatsVm(
      getSectionPayload<StatsSectionPayloadDto>(page.sections, 'stats'),
    ),
    about: mapAboutVm(
      getSectionPayload<AboutSectionPayloadDto>(page.sections, 'about'),
    ),
    institutionsSection: mapHomeInstitutionsSectionVm(
      getSectionPayload<HomeInstitutionsSectionPayloadDto>(
        page.sections,
        'institutions',
      ),
    ),
    enquirySection: mapEnquirySectionVm(
      getSectionPayload<EnquirySectionPayloadDto>(page.sections, 'enquiry'),
    ),
    seo: mapPageSeoVm(page),
  };
}

export function mapTrustInstitutionsPageContentVm(page: PageContentDto): {
  content: InstitutionsPageContentVm;
  seo: PageSeoVm;
} {
  return {
    content: mapInstitutionsPageContentVm(
      getSectionPayload<InstitutionsPageSectionPayloadDto>(
        page.sections,
        'institutions_page',
      ),
    ),
    seo: mapPageSeoVm(page),
  };
}

function getSectionPayload<T>(
  sections: PageContentSectionDto[],
  key: string,
): T {
  const section = sections.find((item) => item.sectionKey === key);
  return (section?.payload ?? {}) as T;
}

function mapPageSeoVm(page: PageContentDto): PageSeoVm {
  return {
    metaTitle: page.page.seo.metaTitle,
    metaDescription: page.page.seo.metaDescription,
  };
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

function mapHeroVm(payload: HeroSectionPayloadDto) {
  return payload.slides ?? [];
}

function mapStatsVm(payload: StatsSectionPayloadDto) {
  return {
    ariaLabel: payload.ariaLabel ?? 'Why choose SSRK',
    items: payload.items ?? [],
  };
}

function mapAboutVm(payload: AboutSectionPayloadDto): TrustAboutContentVm {
  return payload;
}

function mapHomeInstitutionsSectionVm(
  payload: HomeInstitutionsSectionPayloadDto,
): TrustHomeInstitutionsSectionVm {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    titleAccent: payload.titleAccent,
    description: payload.description ?? '',
  };
}

function mapEnquirySectionVm(
  payload: EnquirySectionPayloadDto,
): TrustEnquirySectionContentVm {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    description: payload.description ?? '',
    highlights: payload.highlights ?? [],
  };
}

function mapInstitutionsPageContentVm(
  payload: InstitutionsPageSectionPayloadDto,
): InstitutionsPageContentVm {
  return {
    sectionLabel: payload.sectionLabel ?? '',
    title: payload.title ?? '',
    description: payload.description ?? '',
    cardCtaLabel: payload.cardCtaLabel ?? 'Visit College site',
  };
}
