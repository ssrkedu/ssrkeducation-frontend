import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import {
  TRUST_CONTACT,
  TRUST_INSTITUTION_LINKS,
  TRUST_MAIN_NAV_LINKS,
  TrustLanguage,
  TrustNavLink,
} from '../trust-chrome.config';

@Component({
  selector: 'app-trust-mobile-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-mobile-sidebar.component.html',
  styleUrl: './trust-mobile-sidebar.component.scss',
})
export class TrustMobileSidebarComponent {
  readonly isOpen = input(false);
  readonly activeLanguage = input<TrustLanguage>('en');

  readonly closed = output<void>();
  readonly languageChange = output<TrustLanguage>();

  protected readonly navLinks: TrustNavLink[] = TRUST_MAIN_NAV_LINKS.filter(
    (link) => !link.cta,
  );
  protected readonly institutionLinks = TRUST_INSTITUTION_LINKS;
  protected readonly contact = TRUST_CONTACT;

  protected readonly institutionsExpanded = signal(false);

  protected close(): void {
    this.closed.emit();
  }

  protected setLanguage(language: TrustLanguage): void {
    this.languageChange.emit(language);
  }

  protected toggleInstitutions(): void {
    this.institutionsExpanded.update((open) => !open);
  }

  protected onNavigate(): void {
    this.close();
  }
}
