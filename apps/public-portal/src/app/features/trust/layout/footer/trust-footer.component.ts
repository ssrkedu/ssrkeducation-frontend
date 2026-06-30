import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-footer',
  templateUrl: './trust-footer.component.html',
  styleUrl: './trust-footer.component.scss',
})
export class TrustFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
