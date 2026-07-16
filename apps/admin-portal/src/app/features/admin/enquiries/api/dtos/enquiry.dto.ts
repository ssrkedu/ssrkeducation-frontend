export interface EnquiryListItemDto {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  institutionId: string;
  institution: string;
  courseId: string | null;
  course: string;
  topics: string;
  source: string;
  status: string;
  submittedAtUtc: string;
}

export interface EnquiryListResultDto {
  items: EnquiryListItemDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface EnquiryDetailDto extends EnquiryListItemDto {
  message: string | null;
  notes: string[];
}

export interface InstitutionLookupDto {
  id: string;
  code: string;
  name: string;
}

export interface CourseLookupDto {
  id: string;
  institutionId: string;
  name: string;
  slug: string;
}
