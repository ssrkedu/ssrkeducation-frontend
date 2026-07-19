import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '@ssrk/shared/ui';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Keep toast inside the viewport on phones (default width is ~25rem).
  protected readonly toastBreakpoints: Record<string, Record<string, string>> = {
    '768px': {
      width: 'calc(100% - 1.5rem)',
      left: '0.75rem',
      right: '0.75rem',
      transform: 'none',
    },
  };
}
