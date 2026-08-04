import { ApiLanguageCode } from '../public-api/language-code.util';
import { PublicPageKey, SiteContext, SiteType } from './site-context.model';

const CACHE_PREFIX = 'ssrk-site-context';
const CACHE_VERSION = 1;

interface CachedSiteEntry {
  version: number;
  site: SiteContext;
}

const ENABLED_PAGE_KEYS = new Set<PublicPageKey>([
  'home',
  'institutions',
  'courses',
  'scholarships',
  'gallery',
]);

export function buildSiteCacheKey(host: string, language: ApiLanguageCode): string {
  return `${CACHE_PREFIX}:${host.toLowerCase()}:${language}`;
}

export function readCachedSite(
  host: string,
  language: ApiLanguageCode,
): SiteContext | null {
  try {
    const raw = sessionStorage.getItem(buildSiteCacheKey(host, language));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CachedSiteEntry;
    if (!isValidCachedEntry(parsed)) {
      return null;
    }

    return parsed.site;
  } catch {
    return null;
  }
}

export function writeCachedSite(
  host: string,
  language: ApiLanguageCode,
  site: SiteContext,
): void {
  try {
    const entry: CachedSiteEntry = { version: CACHE_VERSION, site };
    sessionStorage.setItem(buildSiteCacheKey(host, language), JSON.stringify(entry));
  } catch {
    // Quota / private mode — ignore; resolve still works without cache.
  }
}

function isValidCachedEntry(value: unknown): value is CachedSiteEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const entry = value as CachedSiteEntry;
  if (entry.version !== CACHE_VERSION || !entry.site || typeof entry.site !== 'object') {
    return false;
  }

  const site = entry.site;
  const siteType = site.siteType as SiteType;

  return (
    (siteType === 'trust' || siteType === 'institution') &&
    typeof site.tenantKey === 'string' &&
    site.tenantKey.length > 0 &&
    typeof site.name === 'string' &&
    site.name.length > 0 &&
    typeof site.tagline === 'string' &&
    !!site.theme &&
    typeof site.theme.primaryColor === 'string' &&
    Array.isArray(site.enabledPages) &&
    site.enabledPages.every((page) => ENABLED_PAGE_KEYS.has(page))
  );
}
