import { Injectable, signal } from '@angular/core';

@Injectable()
export class MobileEnquireBarService {
  readonly barVisible = signal(true);
}
