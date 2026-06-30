import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {
  TRUST_MAIN_NAV_LINKS,
  TrustLanguage,
  TrustNavLink,
} from '../trust-chrome.config';

@Component({
  selector: 'app-trust-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-header.component.html',
  styleUrl: './trust-header.component.scss',
})
export class TrustHeaderComponent {
  readonly menuOpen = input(false);
  readonly activeLanguage = input<TrustLanguage>('en');

  readonly menuToggle = output<void>();
  readonly languageChange = output<TrustLanguage>();

  protected readonly navLinks: TrustNavLink[] = TRUST_MAIN_NAV_LINKS;

  protected toggleMenu(): void {
    this.menuToggle.emit();
  }

  protected setLanguage(language: TrustLanguage): void {
    this.languageChange.emit(language);
  }
}
