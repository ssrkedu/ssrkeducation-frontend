import { Component, computed, inject } from '@angular/core';
import { SiteContextService } from '../../../../../core/site-context/site-context.service';
import { TrustChromeContentService } from '../../services/trust-chrome-content.service';

@Component({
  selector: 'app-institution-footer',
  templateUrl: './institution-footer.component.html',
})
export class InstitutionFooterComponent {
  private readonly chromeContent = inject(TrustChromeContentService);

  protected readonly site = inject(SiteContextService).site;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly chrome = this.chromeContent.chrome;

  protected readonly contact = computed(() => this.chrome()?.contact);
  protected readonly socialLinks = computed(() => this.chrome()?.socialLinks ?? []);
  protected readonly footerIntro = computed(() => this.chrome()?.footerIntro);
}
