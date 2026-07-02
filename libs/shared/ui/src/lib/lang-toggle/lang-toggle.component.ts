import { Component, input, output } from '@angular/core';
import { LangToggleValue } from './lang-toggle.types';

@Component({
  selector: 'app-lang-toggle',
  host: { class: 'inline-flex shrink-0' },
  template: `
    <div
      class="flex items-center overflow-hidden rounded-[20px] border-[1.5px] border-ssrk-border bg-ssrk-bg"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        class="px-3 py-1.5 text-[11.5px] font-bold transition-all duration-[180ms]"
        [class.bg-ssrk-blue-primary]="value() === 'en'"
        [class.text-white]="value() === 'en'"
        [class.text-ssrk-text-muted]="value() !== 'en'"
        [class.hover:text-ssrk-blue-primary]="value() !== 'en'"
        [attr.aria-pressed]="value() === 'en'"
        (click)="select('en')"
      >
        EN
      </button>
      <button
        type="button"
        class="font-odia px-3 py-1.5 text-[11.5px] font-bold transition-all duration-[180ms]"
        [class.bg-ssrk-blue-primary]="value() === 'od'"
        [class.text-white]="value() === 'od'"
        [class.text-ssrk-text-muted]="value() !== 'od'"
        [class.hover:text-ssrk-blue-primary]="value() !== 'od'"
        [attr.aria-pressed]="value() === 'od'"
        (click)="select('od')"
      >
        ଓଡ଼ିଆ
      </button>
    </div>
  `,
})
export class LangToggleComponent {
  readonly value = input<LangToggleValue>('en');
  readonly valueChange = output<LangToggleValue>();

  protected select(language: LangToggleValue): void {
    if (language !== this.value()) {
      this.valueChange.emit(language);
    }
  }
}
