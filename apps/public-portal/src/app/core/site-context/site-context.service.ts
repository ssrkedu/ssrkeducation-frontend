import { Injectable, computed, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PublicPageKey, SiteContext } from './site-context.model';

@Injectable({ providedIn: 'root' })
export class SiteContextService {
  private readonly title = inject(Title);
  private readonly siteState = signal<SiteContext | null>(null);

  readonly site = this.siteState.asReadonly();
  readonly isTrustSite = computed(() => this.site()?.siteType === 'trust');
  readonly isInstitutionSite = computed(
    () => this.site()?.siteType === 'institution',
  );

  setSite(site: SiteContext): void {
    this.siteState.set(site);
    this.applyBranding(site);
  }

  isPageEnabled(page: PublicPageKey): boolean {
    return this.site()?.enabledPages.includes(page) ?? false;
  }

  private applyBranding(site: SiteContext): void {
    document.documentElement.style.setProperty(
      '--color-ssrk-blue-primary',
      site.theme.primaryColor,
    );
    this.title.setTitle(site.name);
  }
}
