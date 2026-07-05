import { afterNextRender, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { MobileEnquireBarService } from '../services/mobile-enquire-bar.service';
import { MobileEnquireBarConfig } from './mobile-enquire-bar.types';

@Component({
  selector: 'app-mobile-enquire-bar',
  imports: [RouterLink],
  template: `
    @if (config().routerLink) {
      <a
        [routerLink]="config().routerLink!"
        [fragment]="config().fragment"
        [class]="linkClass()"
        [class.translate-y-full]="!enquireService.barVisible()"
        [class.pointer-events-none]="!enquireService.barVisible()"
        [attr.aria-hidden]="!enquireService.barVisible()"
        [attr.tabindex]="enquireService.barVisible() ? 0 : -1"
        (click)="onLinkClick($event)"
      >
        {{ config().label }}
      </a>
    } @else {
      <a
        [href]="config().href ?? '#enquiry'"
        [class]="linkClass()"
        [class.translate-y-full]="!enquireService.barVisible()"
        [class.pointer-events-none]="!enquireService.barVisible()"
        [attr.aria-hidden]="!enquireService.barVisible()"
        [attr.tabindex]="enquireService.barVisible() ? 0 : -1"
        (click)="onLinkClick($event)"
      >
        {{ config().label }}
      </a>
    }
  `,
})
export class MobileEnquireBarComponent {
  readonly config = input.required<MobileEnquireBarConfig>();

  protected readonly enquireService = inject(MobileEnquireBarService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;

  protected linkClass(): string {
    return 'fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#3461e0] px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] text-center text-[15px] font-bold text-white shadow-[0_-4px_20px_rgba(13,35,64,0.18)] transition-transform duration-300 ease-out lg:hidden';
  }

  constructor() {
    afterNextRender(() => this.observeTargetSection());

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.observer?.disconnect();
        this.enquireService.barVisible.set(this.isVisibleRoute());
        requestAnimationFrame(() => this.observeTargetSection());
      });

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  protected onLinkClick(event: MouseEvent): void {
    const href = this.config().href?.trim();
    if (href && this.isExternalUrl(href)) {
      return;
    }

    const sectionId = this.targetSectionId();
    if (!sectionId) {
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      event.preventDefault();
      this.scrollToSection(section, sectionId);
      return;
    }

    const routerLink = this.config().routerLink;
    if (!routerLink) {
      return;
    }

    event.preventDefault();
    void this.router.navigate([routerLink], { fragment: sectionId }).then(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          this.scrollToSection(target, sectionId);
        }
      });
    });
  }

  private targetSectionId(): string | null {
    const fragment = this.config().fragment?.trim();
    if (fragment) {
      return fragment;
    }

    const href = this.config().href?.trim();
    if (href?.startsWith('#') && href.length > 1) {
      return href.slice(1);
    }

    if (href && this.isExternalUrl(href)) {
      return null;
    }

    return 'enquiry';
  }

  private isExternalUrl(href: string): boolean {
    return /^https?:\/\//i.test(href);
  }

  private scrollToSection(section: HTMLElement, sectionId: string): void {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${sectionId}`);
  }

  private observeTargetSection(): void {
    this.observer?.disconnect();

    if (!this.isVisibleRoute()) {
      this.enquireService.barVisible.set(false);
      return;
    }

    const sectionId = this.config().hideWhenSectionId;
    if (!sectionId) {
      this.enquireService.barVisible.set(true);
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      this.enquireService.barVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          this.enquireService.barVisible.set(!entry.isIntersecting);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    );

    this.observer.observe(section);
  }

  private isVisibleRoute(): boolean {
    const visibleRoutes = this.config().visibleOnlyOnRoutes;
    if (!visibleRoutes?.length) {
      return true;
    }

    const currentPath = this.router.url.split(/[?#]/, 1)[0] || '/';
    return visibleRoutes.includes(currentPath);
  }
}
