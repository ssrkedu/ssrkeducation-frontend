import { SiteContextService } from '../../../../core/site-context/site-context.service';
import { MobileNavDrawerConfig } from '@ssrk/shared/ui';

export function buildInstitutionMobileNavConfig(
  siteContext: SiteContextService,
): MobileNavDrawerConfig {
  const items: MobileNavDrawerConfig['items'] = [
    { type: 'link', label: 'Home', routerLink: '/', exact: true },
  ];

  if (siteContext.isPageEnabled('courses')) {
    items.push({ type: 'link', label: 'Courses', routerLink: '/courses' });
  }

  if (siteContext.isPageEnabled('scholarships')) {
    items.push({ type: 'link', label: 'Scholarships', routerLink: '/scholarships' });
  }

  if (siteContext.isPageEnabled('gallery')) {
    items.push({ type: 'link', label: 'Gallery', routerLink: '/gallery' });
  }

  return {
    title: 'Menu',
    ariaLabel: 'Institution mobile navigation',
    items,
    contacts: [
      { icon: '📞', text: '+91 674 255 0000' },
      { icon: '✉', text: 'info@ssrkedu.in' },
    ],
  };
}
