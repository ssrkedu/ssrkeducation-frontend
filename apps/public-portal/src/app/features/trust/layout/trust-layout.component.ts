import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TrustFooterComponent } from './footer/trust-footer.component';
import { TrustHeaderComponent } from './header/trust-header.component';
import { TrustMobileSidebarComponent } from './sidebar/trust-mobile-sidebar.component';
import { TrustLanguage } from './trust-chrome.config';

@Component({
  selector: 'app-trust-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TrustHeaderComponent,
    TrustMobileSidebarComponent,
    TrustFooterComponent,
    RouterOutlet,
  ],
  templateUrl: './trust-layout.component.html',
  styleUrl: './trust-layout.component.scss',
})
export class TrustLayoutComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly activeLanguage = signal<TrustLanguage>('en');

  constructor() {
    effect(() => {
      this.document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
    });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected setLanguage(language: TrustLanguage): void {
    this.activeLanguage.set(language);
  }
}
