export interface EnquiryFormOption {
  label: string;
  value: string;
}

export interface EnquiryFormValue {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  collegeCode: string;
  interests: string[];
}

export const DEFAULT_ENQUIRY_INTEREST_OPTIONS: EnquiryFormOption[] = [
  { label: 'Course Details', value: 'course_details' },
  { label: 'Admission Process', value: 'admission' },
  { label: 'Eligibility Criteria', value: 'eligibility' },
  { label: 'Fee Structure', value: 'fees' },
  { label: 'Scholarships', value: 'scholarships' },
  { label: 'Seat Availability', value: 'seats' },
  { label: 'Hostel Facilities', value: 'hostel' },
  { label: 'Transportation', value: 'transport' },
  { label: 'Campus Facilities', value: 'campus' },
  { label: 'Campus Visit', value: 'visit' },
  { label: 'Call Back Request', value: 'callback' },
  { label: 'Other', value: 'other' },
];
