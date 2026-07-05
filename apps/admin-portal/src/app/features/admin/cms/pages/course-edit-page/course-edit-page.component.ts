import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { map } from 'rxjs';
import { AdminDemoDataService } from '../../../data/admin-demo.service';

@Component({
  selector: 'app-course-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, InputText, Textarea],
  templateUrl: './course-edit-page.component.html',
})
export class CourseEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly demoData = inject(AdminDemoDataService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
    { initialValue: null },
  );

  protected readonly activeLanguage = signal<'od' | 'en'>('od');

  protected readonly pageTitle = computed(() => {
    const slug = this.slug();
    if (!slug) return 'New Course';

    const course = this.demoData.courses().find((item) => item.slug === slug);
    return course ? `Edit ${course.name}` : 'Edit Course';
  });

  protected setLanguage(language: 'od' | 'en'): void {
    this.activeLanguage.set(language);
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/cms');
  }

  protected saveDraft(): void {
    window.alert('Saved as draft! (demo)');
  }

  protected publish(): void {
    window.alert('Published! (demo)');
  }
}
