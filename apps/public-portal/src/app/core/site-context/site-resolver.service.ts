import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { API_ROUTES, buildApiUrl } from '../api/api.routes';
import {
  MOCK_COURSES,
  MOCK_INSTITUTIONS,
  MOCK_SITE_REGISTRY,
} from './mock/public-site.mock-data';
import {
  CourseSummary,
  InstitutionSummary,
  SiteContext,
} from './site-context.model';
import { resolveTenantKeyFromHost } from './site-host.utils';

@Injectable({ providedIn: 'root' })
export class SiteResolverService {
  resolve(hostname = window.location.hostname): Observable<SiteContext> {
    const tenantKey = resolveTenantKeyFromHost(hostname);

    // TODO: GET buildApiUrl(API_ROUTES.public.sites.resolve) with ?host={hostname}
    return this.resolveFromMock(tenantKey);
  }

  private resolveFromMock(tenantKey: string): Observable<SiteContext> {
    const site =
      MOCK_SITE_REGISTRY[tenantKey] ??
      this.buildFallbackInstitutionSite(tenantKey);

    return of(site).pipe(
      delay(150),
      map((resolved) => ({ ...resolved, tenantKey: resolved.tenantKey })),
    );
  }

  private buildFallbackInstitutionSite(tenantKey: string): SiteContext {
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

  getInstitutions(): Observable<InstitutionSummary[]> {
    return of(MOCK_INSTITUTIONS).pipe(delay(100));
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

  /** Reserved for backend integration — documents the future resolve contract. */
  readonly resolveEndpoint = buildApiUrl(API_ROUTES.public.sites.resolve);
}
