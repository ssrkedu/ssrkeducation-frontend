import { PublicPageKey, SiteContext } from '../../../../core/site-context/site-context.model';
import { HeroCarouselSlide } from '@ssrk/shared/ui';

export function buildInstitutionHeroSlides(
  site: SiteContext | null,
  isPageEnabled: (page: PublicPageKey) => boolean,
): HeroCarouselSlide[] {
  return [
    {
      id: 'admissions',
      badge: 'Admissions Open',
      title: `Welcome to ${site?.name ?? 'SSRK'}`,
      description:
        site?.tagline ??
        'Government-affiliated programmes in Science, Arts, Commerce and more.',
      theme: 'institutions',
      primaryAction: {
        label: 'Enquire for Admission',
        href: '#enquiry',
        variant: 'primary',
      },
      secondaryAction: {
        label: 'Explore Programmes',
        href: '#featured-courses',
        variant: 'outline',
      },
    },
    {
      id: 'scholarship',
      badge: 'Scholarships Available',
      title: 'Get Up to 100% Scholarship',
      description: 'For eligible students across selected programmes at this college.',
      theme: 'scholarship',
      primaryAction: {
        label: 'Check Eligibility',
        href: '#enquiry',
        variant: 'primary',
      },
      secondaryAction: {
        label: 'View Courses',
        routerLink: '/courses',
        variant: 'outline',
        hidden: !isPageEnabled('courses'),
      },
    },
  ];
}
