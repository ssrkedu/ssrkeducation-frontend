import { Component } from '@angular/core';
import { HeroCarouselComponent, StatsBarComponent } from '@ssrk/shared/ui';
import { TRUST_ABOUT } from './trust-about.config';
import { TrustAboutSectionComponent } from './trust-about-section.component';
import { TRUST_HERO_SLIDES } from './trust-hero.config';
import { TRUST_STATS_BAR } from './trust-stats.config';

@Component({
  selector: 'app-trust-home-page',
  imports: [HeroCarouselComponent, StatsBarComponent, TrustAboutSectionComponent],
  templateUrl: './trust-home-page.component.html',
})
export class TrustHomePageComponent {
  protected readonly heroSlides = TRUST_HERO_SLIDES;
  protected readonly statsBar = TRUST_STATS_BAR;
  protected readonly about = TRUST_ABOUT;
}
