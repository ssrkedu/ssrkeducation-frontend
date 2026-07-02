import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LangToggleComponent, MobileNavHamburgerComponent } from '@ssrk/shared/ui';
import { SiteLanguageService } from '../../../../../core/site-context/site-language.service';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';

@Component({
  selector: 'app-trust-header',
  host: { class: 'block shrink-0' },
  imports: [RouterLink, RouterLinkActive, LangToggleComponent, MobileNavHamburgerComponent],
  templateUrl: './trust-header.component.html',
})
export class TrustHeaderComponent {
  private readonly headerRef = viewChild<ElementRef<HTMLElement>>('headerRef');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly site = inject(SiteContextService).site;
  protected readonly siteLanguage = inject(SiteLanguageService);
  protected readonly headerSpacerHeight = signal(70);

  constructor() {
    afterNextRender(() => {
      const header = this.headerRef()?.nativeElement;
      if (!header) {
        return;
      }

      const syncHeight = () => this.headerSpacerHeight.set(header.offsetHeight);
      syncHeight();

      const observer = new ResizeObserver(syncHeight);
      observer.observe(header);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
