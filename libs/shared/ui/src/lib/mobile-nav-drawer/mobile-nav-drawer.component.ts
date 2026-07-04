import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import {
  DEFAULT_MOBILE_NAV_BREAKPOINTS,
  MobileNavDrawerBreakpoints,
  MobileNavDrawerConfig,
  MobileNavEntryConfig,
  MobileNavGroupConfig,
  MobileNavLinkConfig,
} from './mobile-nav-drawer.types';
import { MobileNavDrawerService } from '../services/mobile-nav-drawer.service';

@Component({
  selector: 'app-mobile-nav-drawer',
  imports: [Drawer, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav-drawer.component.html',
})
export class MobileNavDrawerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  protected readonly mobileNav = inject(MobileNavDrawerService);
  protected readonly drawerPosition = signal<'right' | 'full'>('right');
  protected readonly expandedGroups = signal<Record<string, boolean>>({});

  readonly config = input.required<MobileNavDrawerConfig>();
  readonly breakpoints = input<MobileNavDrawerBreakpoints>({});

  ngOnInit(): void {
    this.syncExpandedGroups(this.config().items);

    const resolved = this.resolveBreakpoints();
    const compactDrawerQuery = window.matchMedia(
      `(max-width: ${resolved.compactMaxWidth}px)`,
    );
    const desktopNavQuery = window.matchMedia(
      `(min-width: ${resolved.desktopMinWidth}px)`,
    );

    const syncDrawerMode = (): void => {
      this.drawerPosition.set(compactDrawerQuery.matches ? 'full' : 'right');

      if (desktopNavQuery.matches) {
        this.mobileNav.close();
      }
    };

    syncDrawerMode();
    compactDrawerQuery.addEventListener('change', syncDrawerMode);
    desktopNavQuery.addEventListener('change', syncDrawerMode);

    this.destroyRef.onDestroy(() => {
      compactDrawerQuery.removeEventListener('change', syncDrawerMode);
      desktopNavQuery.removeEventListener('change', syncDrawerMode);
    });
  }

  protected visibleItems(): MobileNavEntryConfig[] {
    return this.config().items.filter((item) => !item.hidden);
  }

  protected visibleChildren(group: MobileNavGroupConfig): MobileNavLinkConfig[] {
    return group.children.filter((child) => !child.hidden);
  }

  protected groupKey(group: MobileNavGroupConfig, index: number): string {
    return `${group.label}-${index}`;
  }

  protected isGroupOpen(group: MobileNavGroupConfig, index: number): boolean {
    const key = this.groupKey(group, index);
    return this.expandedGroups()[key] ?? group.initiallyOpen ?? false;
  }

  protected toggleGroup(group: MobileNavGroupConfig, index: number): void {
    const key = this.groupKey(group, index);
    this.expandedGroups.update((state) => ({
      ...state,
      [key]: !(state[key] ?? group.initiallyOpen ?? false),
    }));
  }

  protected closeNav(): void {
    this.mobileNav.close();
  }

  protected onNavLinkClick(
    event: MouseEvent,
    options: {
      href?: string;
      routerLink?: string | unknown[];
      fragment?: string;
    } = {},
  ): void {
    // Blur before drawer teardown — removing a focused node inside the overlay
    // makes mobile browsers jump the page to the top.
    (document.activeElement as HTMLElement | null)?.blur();

    const sectionId = this.resolveSectionId(options.fragment, options.href);

    // In-page section target (e.g. #enquiry, #about)
    if (sectionId) {
      event.preventDefault();

      const section = document.getElementById(sectionId);
      if (section) {
        this.scrollToSection(sectionId);
        this.closeNav();
        return;
      }

      const routerLink = options.routerLink;
      if (routerLink) {
        const commands = Array.isArray(routerLink) ? routerLink : [routerLink];
        this.closeNav();
        void this.router.navigate(commands, { fragment: sectionId }).then(() => {
          this.scrollToSection(sectionId);
        });
        return;
      }

      this.closeNav();
      return;
    }

    // External URL or plain route — let the browser / router handle navigation.
    this.closeNav();
  }

  protected onDrawerVisibleChange(visible: boolean): void {
    this.mobileNav.visible.set(visible);
  }

  private resolveSectionId(
    fragment?: string,
    href?: string,
  ): string | null {
    const fromFragment = fragment?.trim();
    if (fromFragment) {
      return fromFragment;
    }

    const fromHref = href?.trim();
    if (fromHref?.startsWith('#') && fromHref.length > 1) {
      return fromHref.slice(1);
    }

    return null;
  }

  private scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const padding =
      Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
    const top = Math.max(
      0,
      section.getBoundingClientRect().top + window.scrollY - padding,
    );

    // Bypass global `html { scroll-behavior: smooth }` so the jump is not animated/cancelled.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, top);
    root.style.scrollBehavior = previousBehavior;

    history.replaceState(null, '', `#${sectionId}`);
  }

  private resolveBreakpoints(): Required<MobileNavDrawerBreakpoints> {
    return {
      ...DEFAULT_MOBILE_NAV_BREAKPOINTS,
      ...this.breakpoints(),
    };
  }

  private syncExpandedGroups(items: MobileNavEntryConfig[]): void {
    const initialState: Record<string, boolean> = {};

    items.forEach((item, index) => {
      if (item.type === 'group' && item.initiallyOpen) {
        initialState[this.groupKey(item, index)] = true;
      }
    });

    this.expandedGroups.set(initialState);
  }
}
