import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Textarea } from 'primeng/textarea';
import { map, of, switchMap } from 'rxjs';
import { CmsApiService } from '../../api/cms-api.service';
import { CmsContextService } from '../../data/cms-context.service';
import { mapCmsCourseDetailDtoToVm } from '../../mappers/course.mapper';
import { CourseDetailVm } from '../../models/course.model';

@Component({
  selector: 'app-course-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    Button,
    Checkbox,
    InputNumber,
    InputText,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Textarea,
  ],
  templateUrl: './course-edit-page.component.html',
})
export class CourseEditPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cmsApi = inject(CmsApiService);
  private readonly cmsContext = inject(CmsContextService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
    { initialValue: null },
  );

  protected readonly course = signal<CourseDetailVm | null>(null);
  protected readonly activeLanguage = signal<'od' | 'en'>('od');
  protected readonly published = signal(true);
  protected readonly showInList = signal(true);
  protected readonly totalSeats = signal<number | null>(120);

  protected readonly pageTitle = computed(() => {
    const slug = this.slug();
    if (!slug || slug === 'new') return 'New Course';

    const item = this.course();
    return item ? `Edit ${item.translations[0]?.name ?? item.code}` : 'Edit Course';
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('slug')),
        switchMap((slug) => {
          const institutionId = this.cmsContext.selectedInstitutionId();
          if (!slug || slug === 'new' || !institutionId) {
            this.course.set(null);
            return of(null);
          }

          return this.cmsApi.getCourseBySlug(institutionId, slug);
        }),
        takeUntilDestroyed(),
      )
      .subscribe((dto) => {
        if (!dto) return;
        const vm = mapCmsCourseDetailDtoToVm(dto);
        this.course.set(vm);
        this.published.set(vm.status === 'Published');
      });
  }

  protected setLanguage(language: 'od' | 'en' | string | number | undefined): void {
    if (language === 'od' || language === 'en') {
      this.activeLanguage.set(language);
    }
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/cms');
  }

  protected saveDraft(): void {
    const item = this.course();
    if (!item) return;

    this.cmsApi.setCourseStatus(item.id, { status: 'Draft' }).subscribe(() => {
      void this.router.navigateByUrl('/cms');
    });
  }

  protected publish(): void {
    const item = this.course();
    if (!item) return;

    this.cmsApi.setCourseStatus(item.id, { status: 'Published' }).subscribe(() => {
      void this.router.navigateByUrl('/cms');
    });
  }
}
