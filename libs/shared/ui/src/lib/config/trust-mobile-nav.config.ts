import { MobileNavDrawerConfig } from '../mobile-nav-drawer/mobile-nav-drawer.types';

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
        { label: 'Sri Sai Rama Krishna Degree College', href: '#' },
        { label: 'Sri Sai Rama Krishna Junior College (+2)', href: '#' },
      ],
    },
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
