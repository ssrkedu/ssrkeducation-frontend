import { MobileNavDrawerConfig } from '@ssrk/shared/ui';
import { environment } from '../../../../../environments/environment';
import { PageContentDto } from '../../../../core/public-api/dtos/public-api.dtos';
import {
  ChromeContactSectionPayloadDto,
  ChromeFooterIntroSectionPayloadDto,
  ChromeMobileEnquireSectionPayloadDto,
  ChromeMobileNavSectionPayloadDto,
  ChromeNavLinkPayloadDto,
  ChromeNavSectionPayloadDto,
  ChromeSocialSectionPayloadDto,
} from '../../../../core/public-api/dtos/chrome-section-payloads.dto';
import { buildTenantSiteUrl } from '../../../../core/site-context/public-site-url.utils';
import {
  TrustChromeContentVm,
  TrustHeaderNavLinkVm,
  TrustNavChildLinkVm,
  TrustSocialLinkVm,
} from '../models/trust-chrome-content.vm';

export function mapChromePageToVm(page: PageContentDto): TrustChromeContentVm {
  const navPayload = getSectionPayload<ChromeNavSectionPayloadDto>(
    page.sections,
    'nav',
  );
  const contactPayload = getSectionPayload<ChromeContactSectionPayloadDto>(
    page.sections,
    'contact',
  );
  const socialPayload = getSectionPayload<ChromeSocialSectionPayloadDto>(
    page.sections,
    'social',
  );
  const footerIntroPayload = getSectionPayload<ChromeFooterIntroSectionPayloadDto>(
    page.sections,
    'footer_intro',
  );
  const mobileNavPayload = getSectionPayload<ChromeMobileNavSectionPayloadDto>(
    page.sections,
    'mobile_nav',
  );
  const mobileEnquirePayload =
    getSectionPayload<ChromeMobileEnquireSectionPayloadDto>(
      page.sections,
      'mobile_enquire',
    );

  const navLinks = (navPayload.links ?? []).map(mapHeaderNavLinkVm);
  const institutionChildren =
    navLinks.find((link) => link.children?.length)?.children ?? [];

  return {
    navLinks,
    contact: {
      phones: contactPayload.phones ?? [],
      emails: contactPayload.emails ?? [],
      address: contactPayload.address ?? '',
      mobilePhone: contactPayload.mobilePhone,
      mobileEmail: contactPayload.mobileEmail,
      locationLine: contactPayload.locationLine,
    },
    socialLinks: (socialPayload.links ?? []).map(mapSocialLinkVm),
    footerIntro: {
      description: footerIntroPayload.description ?? '',
      locationLine: footerIntroPayload.locationLine ?? 'Odisha, India',
    },
    mobileNavConfig: mapMobileNavConfigVm(mobileNavPayload),
    mobileEnquireConfig: {
      label: mobileEnquirePayload.label ?? 'Enquire Now',
      routerLink: mobileEnquirePayload.routerLink ?? '/',
      fragment: mobileEnquirePayload.fragment ?? 'enquiry',
      hideWhenSectionId: mobileEnquirePayload.hideWhenSectionId,
      visibleOnlyOnRoutes: mobileEnquirePayload.visibleOnlyOnRoutes,
    },
    institutionFooterLinks: institutionChildren.map((child) => ({
      label: child.label,
      href: child.href ?? child.routerLink,
      routerLink: child.routerLink,
    })),
  };
}

function getSectionPayload<T>(
  sections: PageContentDto['sections'],
  key: string,
): T {
  const section = sections.find((item) => item.sectionKey === key);
  return (section?.payload ?? {}) as T;
}

function mapHeaderNavLinkVm(raw: ChromeNavLinkPayloadDto): TrustHeaderNavLinkVm {
  const children = raw.children?.map(mapNavChildLinkVm);

  if (raw.label === 'Admin Portal') {
    return {
      label: raw.label,
      href: environment.publicSite.adminPortalUrl,
      children,
    };
  }

  if (raw.href === '/') {
    return { label: raw.label, routerLink: '/', exact: true, children };
  }

  if (raw.href === '/institutions') {
    return { label: raw.label, routerLink: '/institutions', children };
  }

  if (raw.href.startsWith('#')) {
    return { label: raw.label, href: raw.href, cta: raw.cta, children };
  }

  return { label: raw.label, href: raw.href, cta: raw.cta, children };
}

function mapNavChildLinkVm(child: {
  label: string;
  href: string;
}): TrustNavChildLinkVm {
  if (child.href === '/institutions') {
    return { label: child.label, routerLink: '/institutions' };
  }

  if (child.label.includes('Degree College')) {
    return { label: child.label, href: buildTenantSiteUrl('ssrkdc') };
  }

  if (child.label.includes('Junior College')) {
    return { label: child.label, href: buildTenantSiteUrl('ssrkjc') };
  }

  if (child.href.startsWith('/') && !child.href.startsWith('//')) {
    return { label: child.label, routerLink: child.href };
  }

  return { label: child.label, href: child.href };
}

function mapSocialLinkVm(link: {
  label: string;
  href: string;
  glyph: string;
}): TrustSocialLinkVm {
  return link;
}

function mapMobileNavConfigVm(
  payload: ChromeMobileNavSectionPayloadDto,
): MobileNavDrawerConfig {
  return {
    title: payload.title ?? 'Menu',
    ariaLabel: payload.ariaLabel ?? 'Trust mobile navigation',
    items: (payload.items ?? []).map((item) => {
      if (item.label === 'Admin Portal' && item.type === 'link') {
        return {
          type: 'link' as const,
          label: item.label,
          href: environment.publicSite.adminPortalUrl,
        };
      }

      if (item.type !== 'group' || item.label !== 'Institutions') {
        return item;
      }

      return {
        ...item,
        children: item.children.map((child) => {
          if (child.label.includes('Degree College')) {
            return { ...child, href: buildTenantSiteUrl('ssrkdc') };
          }

          if (child.label.includes('Junior College')) {
            return { ...child, href: buildTenantSiteUrl('ssrkjc') };
          }

          return child;
        }),
      };
    }),
    cta: payload.cta,
    contacts: payload.contacts,
  };
}
