export type EnquiryStatus = 'New' | 'Reviewed' | 'Closed';

export interface EnquiryListItemVm {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  institutionId?: string;
  institution: string;
  courseId?: string | null;
  course: string;
  topics: string;
  source: string;
  status: EnquiryStatus;
  submittedOn: string;
}

export interface EnquiryDetailVm extends EnquiryListItemVm {
  message?: string | null;
  notes: string[];
}

export interface EnquiryFilters {
  status: EnquiryStatus | '';
  institutionId: string;
  courseId: string;
  search: string;
}

export interface LookupOptionVm {
  label: string;
  value: string;
}
