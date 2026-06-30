import { MobileNavDrawerConfig } from '@ssrk/shared/ui';

export const TRUST_MOBILE_NAV_CONFIG: MobileNavDrawerConfig = {
  title: 'Menu',
  ariaLabel: 'Trust mobile navigation',
  items: [
    { type: 'link', label: 'Home', routerLink: '/', exact: true },
    { type: 'link', label: 'About Us', href: '#about' },
    {
      type: 'group',
      label: 'Institutions',
      children: [
        { label: 'All Institutions', routerLink: '/institutions' },
        { label: 'SSRK Degree College', href: '#' },
        { label: 'SSRK Engineering College', href: '#' },
        { label: 'SSRK College of Pharmacy', href: '#' },
        { label: 'SSRK College of Education', href: '#' },
        { label: 'SSRK Junior College (+2)', href: '#' },
        { label: 'SSRK Institute of Management', href: '#' },
      ],
    },
    { type: 'link', label: 'News & Events', href: '#news' },
    { type: 'link', label: 'Admin Portal', href: '#' },
  ],
  cta: {
    label: 'Enquire / Apply Now',
    href: '#enquiry',
  },
  contacts: [
    { icon: '📞', text: '+91 674 255 0000' },
    { icon: '✉', text: 'info@ssrkedu.in' },
  ],
};
