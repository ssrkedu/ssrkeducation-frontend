import { EnquiryStatus } from '../../models/enquiry.model';

export interface EnquirySearchCriteria {
  status?: EnquiryStatus | '';
  institutionId?: string;
  courseId?: string;
  search?: string;
  page: number;
  pageSize: number;
}

export interface UpdateEnquiryStatusRequest {
  status: EnquiryStatus;
}

export interface AddEnquiryNoteRequest {
  note: string;
}
