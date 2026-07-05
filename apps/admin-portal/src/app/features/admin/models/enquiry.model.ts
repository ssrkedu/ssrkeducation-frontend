export type EnquiryStatus = 'New' | 'Reviewed';

export interface EnquiryItem {
  id: number;
  name: string;
  phone: string;
  institution: string;
  course: string;
  topics: string;
  source: string;
  status: EnquiryStatus;
  submittedOn: string;
  notes: string[];
}

export interface EnquiryFilters {
  status: EnquiryStatus | '';
  institution: string;
  course: string;
  search: string;
}
