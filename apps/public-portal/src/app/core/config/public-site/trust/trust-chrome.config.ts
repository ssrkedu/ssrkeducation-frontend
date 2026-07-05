// FALLBACK-PHASE: static chrome content kept for content-fallback plan.
// Chrome now loads from GET /api/public/sites/trust/pages/chrome

import { buildTenantSiteUrl } from '../../../site-context/public-site-url.utils';
import {
  TrustFooterLink,
  TrustNavChildLink,
  TrustNavLink,
} from './trust-chrome-fallback.types';

export type {
  TrustFooterLink,
  TrustLanguage,
  TrustNavChildLink,
  TrustNavLink,
} from './trust-chrome-fallback.types';

export const TRUST_INSTITUTION_LINKS: TrustNavChildLink[] = [
  { label: 'Sri Sai Rama Krishna Degree College', href: buildTenantSiteUrl('ssrkdc') },
  { label: 'Sri Sai Rama Krishna Junior College (+2)', href: buildTenantSiteUrl('ssrkjc') },
];

export const TRUST_MAIN_NAV_LINKS: TrustNavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Institutions',
    href: '#institutions',
    children: TRUST_INSTITUTION_LINKS,
  },
  { label: 'Admin Portal', href: '#' },
  { label: 'Enquire Now', href: '#enquiry', cta: true },
];

export const TRUST_FOOTER_QUICK_LINKS: TrustFooterLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Admissions', href: '#enquiry' },
  { label: 'Scholarships', href: '#' },
  { label: 'Photo Gallery', href: '#' },
  { label: 'Results', href: '#' },
  { label: 'Download Forms', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export const TRUST_SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', glyph: 'f' },
  { label: 'YouTube', href: '#', glyph: '▶' },
  { label: 'Instagram', href: '#', glyph: 'in' },
  { label: 'Twitter', href: '#', glyph: 'X' },
] as const;

export const TRUST_CONTACT = {
  phones: ['+91 674 255 0000', '+91 674 255 0001'],
  emails: ['info@ssrkedu.in', 'admissions@ssrkedu.in'],
  address: 'SSRK Trust Campus, Patia,\nBhubaneswar – 751 024,\nOdisha, India',
  mobilePhone: '+91 674 255 0000',
  mobileEmail: 'info@ssrkedu.in',
} as const;
