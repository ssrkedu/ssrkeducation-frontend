import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MobileNavDrawerService {
  readonly visible = signal(false);

  toggle(): void {
    this.visible.update((open) => !open);
  }

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}
