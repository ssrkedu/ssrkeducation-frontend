export type TrustLanguage = 'en' | 'od';

export interface TrustNavChildLink {
  label: string;
  href: string;
}

export interface TrustNavLink {
  label: string;
  href: string;
  children?: TrustNavChildLink[];
  cta?: boolean;
}

export interface TrustFooterLink {
  label: string;
  href: string;
}

export const TRUST_INSTITUTION_LINKS: TrustNavChildLink[] = [
  { label: 'Sri Sai Rama Krishna Degree College', href: '#' },
  { label: 'Sri Sai Rama Krishna Junior College (+2)', href: '#' },
];

export const TRUST_MAIN_NAV_LINKS: TrustNavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Institutions',
    href: '#institutions',
    children: TRUST_INSTITUTION_LINKS,
  },
  // { label: 'News & Events', href: '#news' },
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
