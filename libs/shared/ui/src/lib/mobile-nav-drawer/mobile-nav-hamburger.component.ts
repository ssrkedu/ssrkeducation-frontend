import { Component, inject, input } from '@angular/core';
import { MobileNavDrawerService } from './mobile-nav-drawer.service';

@Component({
  selector: 'app-mobile-nav-hamburger',
  template: `
    <button
      type="button"
      class="flex flex-col gap-1.5 p-2"
      [class]="buttonClass()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="mobileNav.visible()"
      (click)="toggle()"
    >
      <span
        class="block h-0.5 w-6 rounded-sm bg-ssrk-text-heading transition-transform"
        [class.translate-y-[7px]]="mobileNav.visible()"
        [class.rotate-45]="mobileNav.visible()"
      ></span>
      <span
        class="block h-0.5 w-6 rounded-sm bg-ssrk-text-heading transition-opacity"
        [class.opacity-0]="mobileNav.visible()"
      ></span>
      <span
        class="block h-0.5 w-6 rounded-sm bg-ssrk-text-heading transition-transform"
        [class.-translate-y-[7px]]="mobileNav.visible()"
        [class.-rotate-45]="mobileNav.visible()"
      ></span>
    </button>
  `,
})
export class MobileNavHamburgerComponent {
  protected readonly mobileNav = inject(MobileNavDrawerService);
  readonly ariaLabel = input('Open menu');
  readonly buttonClass = input('lg:hidden');

  protected toggle(): void {
    this.mobileNav.toggle();
  }
}
