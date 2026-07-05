import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { map } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AdminDemoDataService } from '../../../data/admin-demo.service';
import { EnquiryStatus } from '../../../models/enquiry.model';
import { AdminPermissionBannerComponent } from '../../../shared/components/admin-permission-banner/admin-permission-banner.component';

@Component({
  selector: 'app-enquiry-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, Button, Select, Textarea, AdminPermissionBannerComponent],
  templateUrl: './enquiry-detail-page.component.html',
})
export class EnquiryDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly demoData = inject(AdminDemoDataService);
  protected readonly auth = inject(AuthService);

  private readonly enquiryId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 },
  );

  protected readonly enquiry = computed(() =>
    this.demoData.getEnquiryById(this.enquiryId()),
  );

  protected readonly statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Reviewed', value: 'Reviewed' },
  ];

  protected readonly noteDraft = signal('');

  protected readonly detailRows = computed(() => {
    const item = this.enquiry();
    if (!item) return [];

    return [
      { label: 'Student Name', value: item.name },
      { label: 'Phone', value: item.phone },
      { label: 'Institution', value: item.institution },
      { label: 'Course', value: item.course },
      { label: 'Topics', value: item.topics },
      { label: 'Source', value: item.source },
      { label: 'Submitted', value: item.submittedOn },
    ];
  });

  protected updateStatus(status: EnquiryStatus): void {
    const item = this.enquiry();
    if (!item || !this.auth.canWriteEnquiries()) return;
    this.demoData.updateEnquiryStatus(item.id, status);
  }

  protected saveNote(): void {
    const item = this.enquiry();
    const note = this.noteDraft().trim();
    if (!item || !note || !this.auth.canWriteEnquiries()) return;

    this.demoData.addEnquiryNote(item.id, note);
    this.noteDraft.set('');
  }

  protected markReviewed(): void {
    this.updateStatus('Reviewed');
  }

  protected onNoteInput(event: Event): void {
    this.noteDraft.set((event.target as HTMLTextAreaElement).value);
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/enquiries');
  }
}
