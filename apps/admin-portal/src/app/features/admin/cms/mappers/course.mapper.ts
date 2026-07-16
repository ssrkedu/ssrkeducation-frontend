import { formatAdminDate } from '../../shared/utils/format-admin-date.util';
import {
  CmsCourseDetailDto,
  CmsCourseListItemDto,
  CmsInstitutionDto,
} from '../api/dtos/cms.dto';
import {
  CourseDetailVm,
  CourseListItemVm,
  CoursePublishStatus,
  CmsInstitutionVm,
} from '../models/course.model';

function mapCourseStatus(status: string): CoursePublishStatus {
  if (status === 'Published' || status === 'Archived') {
    return status;
  }

  return 'Draft';
}

export function mapCmsInstitutionDtoToVm(dto: CmsInstitutionDto): CmsInstitutionVm {
  return {
    id: dto.id,
    code: dto.code,
    slug: dto.slug,
    name: dto.name,
    status: dto.status,
  };
}

export function mapCmsCourseListItemDtoToVm(dto: CmsCourseListItemDto): CourseListItemVm {
  return {
    id: dto.id,
    institutionId: dto.institutionId,
    name: dto.name,
    slug: dto.slug,
    code: dto.code,
    duration: dto.duration || '—',
    seats: dto.seats,
    status: mapCourseStatus(dto.status),
    updatedOn: dto.updatedAtUtc ? formatAdminDate(dto.updatedAtUtc) : '—',
  };
}

export function mapCmsCourseDetailDtoToVm(dto: CmsCourseDetailDto): CourseDetailVm {
  return {
    id: dto.id,
    institutionId: dto.institutionId,
    code: dto.code,
    slug: dto.slug,
    status: mapCourseStatus(dto.status),
    sortOrder: dto.sortOrder,
    duration: dto.duration || '',
    seats: dto.seats,
    translations: dto.translations.map((translation) => ({
      languageCode: translation.languageCode,
      name: translation.name,
      summary: translation.summary,
      description: translation.description,
      eligibility: translation.eligibility,
      feeDisplayText: translation.feeDisplayText,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription,
    })),
  };
}
