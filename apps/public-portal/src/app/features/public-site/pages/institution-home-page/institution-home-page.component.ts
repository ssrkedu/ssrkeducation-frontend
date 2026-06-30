import { Component, computed, inject } from '@angular/core';
import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { HeroCarouselComponent } from '@ssrk/shared/ui';
import { buildInstitutionHeroSlides } from './institution-hero.config';

@Component({
  selector: 'app-institution-home-page',
  imports: [HeroCarouselComponent],
  templateUrl: './institution-home-page.component.html',
})
export class InstitutionHomePageComponent {
  private readonly siteContext = inject(SiteContextService);

  protected readonly heroSlides = computed(() =>
    buildInstitutionHeroSlides(this.siteContext.site(), (page) =>
      this.siteContext.isPageEnabled(page),
    ),
  );
}
