import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  protected onDrawerVisibleChange(visible: boolean): void {
    this.mobileNav.visible.set(visible);
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
