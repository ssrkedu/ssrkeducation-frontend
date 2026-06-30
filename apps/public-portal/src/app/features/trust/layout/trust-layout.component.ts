import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrustHeaderComponent } from './header/trust-header.component';
import { TrustFooterComponent } from './footer/trust-footer.component';

@Component({
  selector: 'app-trust-layout',
  imports: [TrustHeaderComponent, TrustFooterComponent, RouterOutlet],
  templateUrl: './trust-layout.component.html',
  styleUrl: './trust-layout.component.scss',
})
export class TrustLayoutComponent {}
