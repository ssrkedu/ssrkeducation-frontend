import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-brand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex items-center gap-3">
      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-ssrk-blue-primary font-serif text-[15px] font-bold text-white"
      >
        DC
      </div>
      <div>
        <p class="font-serif text-[15px] font-bold text-ssrk-text-heading">SSRK Edu</p>
        <p class="mt-0.5 text-[11px] text-ssrk-text-muted">Admin Portal</p>
      </div>
    </div>
  `,
})
export class AuthBrandComponent {}
