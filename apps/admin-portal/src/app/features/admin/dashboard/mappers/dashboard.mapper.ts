import { formatAdminDate } from '../../shared/utils/format-admin-date.util';
import {
  DashboardSummaryDto,
  RecentEnquiryDto,
} from '../api/dtos/dashboard.dto';
import { EnquiryListItemVm } from '../../enquiries/models/enquiry.model';

export interface DashboardSummaryVm {
  newEnquiryCount: number;
  totalEnquiryCount: number;
  publishedCourseCount: number;
  activeUserCount: number;
  recentEnquiries: EnquiryListItemVm[];
  enquiriesByCourse: { course: string; count: number; percent: number }[];
}

export function mapRecentEnquiryDtoToListItemVm(dto: RecentEnquiryDto): EnquiryListItemVm {
  return {
    id: dto.id,
    name: dto.name,
    phone: '',
    institution: dto.institution,
    course: dto.course,
    topics: '',
    source: '',
    status: dto.status as EnquiryListItemVm['status'],
    submittedOn: formatAdminDate(dto.submittedAtUtc),
  };
}

export function mapDashboardSummaryDtoToVm(dto: DashboardSummaryDto): DashboardSummaryVm {
  return {
    newEnquiryCount: dto.newEnquiryCount,
    totalEnquiryCount: dto.totalEnquiryCount,
    publishedCourseCount: dto.publishedCourseCount,
    activeUserCount: dto.activeUserCount,
    recentEnquiries: dto.recentEnquiries.map(mapRecentEnquiryDtoToListItemVm),
    enquiriesByCourse: dto.enquiriesByCourse.map((item) => ({
      course: item.course,
      count: item.count,
      percent: item.percent,
    })),
  };
}
