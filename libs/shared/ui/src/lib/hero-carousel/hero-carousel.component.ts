import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimeTemplate } from 'primeng/api';
import { Carousel } from 'primeng/carousel';
import {
  DEFAULT_HERO_CAROUSEL_OPTIONS,
  HeroCarouselAction,
  HeroCarouselActionVariant,
  HeroCarouselOptions,
  HeroCarouselSlide,
  HeroCarouselTheme,
} from './hero-carousel.types';

@Component({
  selector: 'app-hero-carousel',
  imports: [Carousel, RouterLink, PrimeTemplate, NgClass],
  templateUrl: './hero-carousel.component.html',
})
export class HeroCarouselComponent {
  readonly slides = input.required<HeroCarouselSlide[]>();
  readonly options = input<HeroCarouselOptions>({});

  protected resolvedOptions(): Required<HeroCarouselOptions> {
    return {
      ...DEFAULT_HERO_CAROUSEL_OPTIONS,
      ...this.options(),
    };
  }

  protected visibleAction(action: HeroCarouselAction | undefined): action is HeroCarouselAction {
    return !!action && !action.hidden;
  }

  protected actionClass(variant: HeroCarouselActionVariant | undefined): string {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-ssrk-sm px-[26px] py-3 text-sm font-semibold transition';

    if (variant === 'outline') {
      return `${base} border-2 border-white/65 bg-transparent font-semibold text-white hover:border-white hover:bg-white/15`;
    }

    return `${base} bg-ssrk-saffron font-bold text-white hover:bg-[#b5660a] hover:shadow-lg`;
  }

  protected slideThemeClass(theme: HeroCarouselTheme | undefined): string {
    switch (theme) {
      case 'scholarship':
        return 'ssrk-hero-slide--scholarship';
      case 'institutions':
        return 'ssrk-hero-slide--institutions';
      default:
        return 'ssrk-hero-slide--default';
    }
  }
}
