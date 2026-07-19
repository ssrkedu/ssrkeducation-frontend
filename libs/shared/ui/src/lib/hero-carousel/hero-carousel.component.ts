import { NgClass, NgTemplateOutlet } from '@angular/common';
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
  imports: [Carousel, RouterLink, PrimeTemplate, NgClass, NgTemplateOutlet],
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
      'inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-ssrk-sm px-[26px] py-3 text-sm font-semibold transition sm:w-auto';

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
      case 'institution':
        return 'ssrk-hero-slide--institution';
      default:
        return 'ssrk-hero-slide--default';
    }
  }

  protected isCarouselMode(): boolean {
    return this.slides().length > 1;
  }

  protected slideLayoutClass(slide: HeroCarouselSlide): string {
    const base =
      'relative z-[2] mx-auto grid w-full min-w-0 max-w-[1180px] grid-cols-1 items-center px-4 sm:px-6 lg:px-8';

    if (slide.supportImages?.length) {
      return `${base} lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-12`;
    }

    return base;
  }
}
