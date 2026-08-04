import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResolvedSiteDto } from '../public-api/dtos/public-api.dtos';
import { toApiLanguage } from '../public-api/language-code.util';
import { PublicApiClient } from '../public-api/public-api.client';
import { getResolveHost } from '../public-api/public-api.routes';
import {
  CourseSummary,
  PublicPageKey,
  SiteContext,
  SiteType,
} from './site-context.model';
import { SiteLanguageService } from './site-language.service';
import { resolveTenantKeyFromHost } from './site-host.utils';
import { writeCachedSite } from './site-session-cache';
import { MOCK_COURSES, MOCK_SITE_REGISTRY } from './mock/public-site.mock-data';

@Injectable({ providedIn: 'root' })
export class SiteResolverService {
  private readonly api = inject(PublicApiClient);
  private readonly siteLanguage = inject(SiteLanguageService);

  resolve(
    hostname = window.location.hostname,
    language = this.siteLanguage.language(),
  ): Observable<SiteContext> {
    const resolveHost = getResolveHost(hostname);
    const apiLanguage = toApiLanguage(language);

    // Failures must stay failures so a bad response never overwrites a good cache.
    return this.api.resolveSite(resolveHost, apiLanguage).pipe(
      map(mapDtoToSiteContext),
      tap((site) => writeCachedSite(resolveHost, apiLanguage, site)),
    );
  }

  /** Local/dev only — never used when environment.production is true. */
  getFallbackSite(hostname = window.location.hostname): SiteContext | null {
    if (environment.production) {
      return null;
    }

    return resolveFallbackSite(resolveTenantKeyFromHost(hostname));
  }

  getCoursesForInstitution(institutionId: string): Observable<CourseSummary[]> {
    const courses = MOCK_COURSES.filter(
      (course) => course.institutionId === institutionId,
    );
    return of(courses).pipe(delay(100));
  }

  getCourseBySlug(
    institutionId: string,
    courseSlug: string,
  ): Observable<CourseSummary | null> {
    const course =
      MOCK_COURSES.find(
        (item) =>
          item.institutionId === institutionId && item.slug === courseSlug,
      ) ?? null;
    return of(course).pipe(delay(100));
  }
}

function mapDtoToSiteContext(dto: { site: ResolvedSiteDto }): SiteContext {
  const site = dto.site;

  return {
    siteType: mapSiteType(site.siteType),
    tenantKey: site.tenantKey,
    institutionId: site.institutionId,
    name: site.name,
    tagline: site.tagline ?? '',
    theme: { primaryColor: site.primaryColor ?? '#1e3a8a' },
    logoUrl: site.logoUrl,
    enabledPages: mapEnabledPages(site.enabledPages),
  };
}

function mapSiteType(siteType: string): SiteType {
  return siteType.toLowerCase() === 'institution' ? 'institution' : 'trust';
}

const ENABLED_PAGE_KEYS = new Set<PublicPageKey>([
  'home',
  'institutions',
  'courses',
  'scholarships',
  'gallery',
]);

function mapEnabledPages(pages: string[]): PublicPageKey[] {
  return pages.filter((page): page is PublicPageKey =>
    ENABLED_PAGE_KEYS.has(page as PublicPageKey),
  );
}

function resolveFallbackSite(tenantKey: string): SiteContext {
  const fromRegistry = MOCK_SITE_REGISTRY[tenantKey];
  if (fromRegistry) {
    return fromRegistry;
  }

  if (tenantKey === 'trust') {
    return MOCK_SITE_REGISTRY['trust'];
  }

  return {
    siteType: 'institution',
    tenantKey,
    institutionId: `inst-${tenantKey}`,
    name: tenantKey.toUpperCase(),
    tagline: 'Institution website',
    theme: { primaryColor: '#1e3a8a' },
    logoUrl: null,
    enabledPages: ['home', 'courses', 'scholarships', 'gallery'],
  };
}
