import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TRUST_CONTACT,
  TRUST_FOOTER_QUICK_LINKS,
  TRUST_INSTITUTION_LINKS,
  TRUST_SOCIAL_LINKS,
} from '../trust-chrome.config';

@Component({
  selector: 'app-trust-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-footer.component.html',
  styleUrl: './trust-footer.component.scss',
})
export class TrustFooterComponent {
  protected readonly institutionLinks = TRUST_INSTITUTION_LINKS;
  protected readonly quickLinks = TRUST_FOOTER_QUICK_LINKS;
  protected readonly socialLinks = TRUST_SOCIAL_LINKS;
  protected readonly contact = TRUST_CONTACT;
  protected readonly currentYear = new Date().getFullYear();
}
