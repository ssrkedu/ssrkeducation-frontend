export interface DashboardSummaryDto {
  newEnquiryCount: number;
  totalEnquiryCount: number;
  publishedCourseCount: number;
  activeUserCount: number;
  recentEnquiries: RecentEnquiryDto[];
  enquiriesByCourse: EnquiriesByCourseDto[];
}

export interface RecentEnquiryDto {
  id: string;
  name: string;
  institution: string;
  course: string;
  status: string;
  submittedAtUtc: string;
}

export interface EnquiriesByCourseDto {
  course: string;
  count: number;
  percent: number;
}
