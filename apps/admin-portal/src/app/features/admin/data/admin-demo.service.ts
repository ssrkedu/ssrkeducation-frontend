import { Injectable, computed, signal } from '@angular/core';
import { CourseItem } from '../models/course.model';
import { EnquiryFilters, EnquiryItem, EnquiryStatus } from '../models/enquiry.model';
import { ManagedUser } from '../models/managed-user.model';

const INITIAL_ENQUIRIES: EnquiryItem[] = [
  { id: 1, name: 'Priya Sharma', phone: '9437001122', institution: 'Degree College', course: 'B.Com', topics: 'Fees, Eligibility', source: 'Website Form', status: 'New', submittedOn: '27 Jun 2026', notes: [] },
  { id: 2, name: 'Rahul Patra', phone: '8763441233', institution: 'Degree College', course: 'BCA', topics: 'Scholarship', source: 'Website Form', status: 'New', submittedOn: '27 Jun 2026', notes: [] },
  { id: 3, name: 'Anita Mishra', phone: '7894561230', institution: 'Degree College', course: 'B.Sc', topics: 'Admissions', source: 'Google Ad', status: 'Reviewed', submittedOn: '26 Jun 2026', notes: ['Called, interested in B.Sc PCM. Will visit campus on Monday.'] },
  { id: 4, name: 'Suresh Nayak', phone: '9856321478', institution: 'Junior College', course: 'Commerce', topics: 'Hostel', source: 'WhatsApp', status: 'Reviewed', submittedOn: '26 Jun 2026', notes: ['Hostel details shared via WhatsApp.'] },
  { id: 5, name: 'Kavya Rath', phone: '8765431290', institution: 'Degree College', course: 'D.Pharm', topics: 'Fees, PCI approval', source: 'Website Form', status: 'New', submittedOn: '25 Jun 2026', notes: [] },
  { id: 6, name: 'Bikash Das', phone: '9778342156', institution: 'Degree College', course: 'B.A', topics: 'Scholarship', source: 'Walk-in', status: 'Reviewed', submittedOn: '25 Jun 2026', notes: ['OBC scholarship info provided.'] },
  { id: 7, name: 'Sonal Swain', phone: '9040123456', institution: 'Degree College', course: 'B.Com', topics: 'Eligibility', source: 'Website Form', status: 'New', submittedOn: '24 Jun 2026', notes: [] },
  { id: 8, name: 'Manish Sahoo', phone: '7654321098', institution: 'Degree College', course: 'BCA', topics: 'Placement', source: 'Google Ad', status: 'Reviewed', submittedOn: '24 Jun 2026', notes: ['Placement stats shared via email.'] },
  { id: 9, name: 'Deepika Behera', phone: '8901234567', institution: 'Degree College', course: 'B.Sc', topics: 'Fees', source: 'Website Form', status: 'New', submittedOn: '23 Jun 2026', notes: [] },
  { id: 10, name: 'Ajit Mohanty', phone: '9123456780', institution: 'Degree College', course: 'D.Pharm', topics: 'Hostel, Scholarship', source: 'Referral', status: 'New', submittedOn: '23 Jun 2026', notes: [] },
];

const INITIAL_COURSES: CourseItem[] = [
  { name: 'D.Pharm', slug: 'd-pharm', duration: '2 Years', seats: 60, status: 'Published', updatedOn: '20 Jun 2026' },
  { name: 'B.Sc', slug: 'b-sc', duration: '3 Years', seats: 80, status: 'Published', updatedOn: '18 Jun 2026' },
  { name: 'B.Com', slug: 'b-com', duration: '3 Years', seats: 120, status: 'Published', updatedOn: '15 Jun 2026' },
  { name: 'B.A', slug: 'b-a', duration: '3 Years', seats: 160, status: 'Published', updatedOn: '15 Jun 2026' },
  { name: 'BBA', slug: 'bba', duration: '3 Years', seats: 60, status: 'Published', updatedOn: '10 Jun 2026' },
  { name: 'BCA', slug: 'bca', duration: '3 Years', seats: 60, status: 'Draft', updatedOn: '27 Jun 2026' },
];

const INITIAL_USERS: ManagedUser[] = [
  { id: 1, name: 'Vikram Sharma', initials: 'VS', email: 'vikram@ssrkedu.com', role: 'super_admin', permissions: ['content_management', 'enquiry_management'], active: true, lastLogin: 'Today, 9:41 AM' },
  { id: 2, name: 'Sunita Patra', initials: 'SP', email: 'sunita@ssrkedu.com', role: 'admin', permissions: ['enquiry_management'], active: true, lastLogin: 'Today, 8:15 AM' },
  { id: 3, name: 'Meera Das', initials: 'MD', email: 'meera@ssrkedu.com', role: 'admin', permissions: ['content_management'], active: true, lastLogin: 'Yesterday, 4:30 PM' },
];

@Injectable({ providedIn: 'root' })
export class AdminDemoDataService {
  readonly enquiries = signal<EnquiryItem[]>(INITIAL_ENQUIRIES);
  readonly courses = signal<CourseItem[]>(INITIAL_COURSES);
  readonly users = signal<ManagedUser[]>(INITIAL_USERS);

  readonly newEnquiryCount = computed(
    () => this.enquiries().filter((item) => item.status === 'New').length,
  );

  readonly totalEnquiryCount = computed(() => this.enquiries().length);

  readonly publishedCourseCount = computed(
    () => this.courses().filter((item) => item.status === 'Published').length,
  );

  readonly activeUserCount = computed(
    () => this.users().filter((item) => item.active).length,
  );

  readonly recentEnquiries = computed(() => this.enquiries().slice(0, 5));

  readonly enquiriesByCourse = computed(() => {
    const counts = new Map<string, number>();
    for (const enquiry of this.enquiries()) {
      counts.set(enquiry.course, (counts.get(enquiry.course) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([course, count]) => ({
        course,
        count,
        percent: Math.round((count / this.enquiries().length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  });

  getEnquiryById(id: number): EnquiryItem | undefined {
    return this.enquiries().find((item) => item.id === id);
  }

  filterEnquiries(filters: EnquiryFilters): EnquiryItem[] {
    const query = filters.search.trim().toLowerCase();

    return this.enquiries().filter((item) => {
      if (filters.status && item.status !== filters.status) return false;
      if (filters.institution && item.institution !== filters.institution) return false;
      if (filters.course && item.course !== filters.course) return false;
      if (query && !item.name.toLowerCase().includes(query) && !item.phone.includes(query)) {
        return false;
      }
      return true;
    });
  }

  updateEnquiryStatus(id: number, status: EnquiryStatus): void {
    this.enquiries.update((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  addEnquiryNote(id: number, note: string): void {
    this.enquiries.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, notes: [...item.notes, note] } : item,
      ),
    );
  }
}
