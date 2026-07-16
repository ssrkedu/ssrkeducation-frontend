import { formatAdminDate } from '../../shared/utils/format-admin-date.util';
import { EnquiryDetailDto, EnquiryListItemDto } from '../api/dtos/enquiry.dto';
import {
  EnquiryDetailVm,
  EnquiryListItemVm,
  EnquiryStatus,
} from '../models/enquiry.model';

function mapStatus(status: string): EnquiryStatus {
  if (status === 'Reviewed' || status === 'Closed') {
    return status;
  }

  return 'New';
}

export function mapEnquiryListItemDtoToVm(dto: EnquiryListItemDto): EnquiryListItemVm {
  return {
    id: dto.id,
    name: dto.name,
    phone: dto.phone,
    email: dto.email,
    institutionId: dto.institutionId,
    institution: dto.institution,
    courseId: dto.courseId,
    course: dto.course,
    topics: dto.topics,
    source: dto.source,
    status: mapStatus(dto.status),
    submittedOn: formatAdminDate(dto.submittedAtUtc),
  };
}

export function mapEnquiryDetailDtoToVm(dto: EnquiryDetailDto): EnquiryDetailVm {
  return {
    ...mapEnquiryListItemDtoToVm(dto),
    message: dto.message,
    notes: dto.notes,
  };
}
