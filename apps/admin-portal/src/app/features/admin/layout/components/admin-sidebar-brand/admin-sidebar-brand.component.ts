import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar-brand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-2.5 border-b border-white/10 px-[18px] py-[18px]">
      <div
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ssrk-saffron font-serif text-[13px] font-bold text-white"
      >
        DC
      </div>
      <div>
        <p class="text-[11px] font-bold leading-tight text-white/90">SSRK Edu</p>
        <p class="mt-0.5 text-[10px] tracking-wide text-white/40">ADMIN PORTAL</p>
      </div>
    </div>
  `,
})
export class AdminSidebarBrandComponent {}
