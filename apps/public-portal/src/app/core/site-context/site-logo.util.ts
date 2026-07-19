export type SiteLogoKey = 'ssrkg' | 'ssrkdc' | 'osahss';

const LOGO_ALT: Record<SiteLogoKey, string> = {
  ssrkg: 'Sri Sai Rama Krishna Group of Institutions',
  ssrkdc: 'Sri Sai Rama Krishna Degree College',
  osahss: 'Odisha Saura Anchal H.S.S.',
};

/** Maps site tenant to local logo pack (ssrkjc uses osahss brand assets). */
export function resolveSiteLogoKey(tenantKey: string | undefined | null): SiteLogoKey {
  switch (tenantKey) {
    case 'ssrkdc':
      return 'ssrkdc';
    case 'ssrkjc':
      return 'osahss';
    default:
      return 'ssrkg';
  }
}

export function buildSiteLogoSrc(
  tenantKey: string | undefined | null,
  variant: 'desktop' | 'favicon' | 'apple' = 'desktop',
): string {
  const key = resolveSiteLogoKey(tenantKey);

  if (variant === 'favicon') {
    return `/assets/logos/${key}/${key}-favicon-32.png`;
  }

  if (variant === 'apple') {
    return `/assets/logos/${key}/${key}-apple-180.png`;
  }

  return `/assets/logos/${key}/${key}-desktop@2x.png`;
}

export function siteLogoAlt(tenantKey: string | undefined | null): string {
  return LOGO_ALT[resolveSiteLogoKey(tenantKey)];
}
