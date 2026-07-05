# Trust site — content configuration map

How visible content is supplied on the **trust** public site today, section by section.

**Goal (target state):** all user-facing copy and lists should be highly configurable (CMS/API or a single content layer), not scattered in templates.

**Current state (API-driven):** trust site content loads from backend public APIs on startup and reloads when language changes. Static `*.config.ts` and mock files are **kept but commented out** for a future API-failure fallback phase.

```text
PublicApiClient  →  SiteResolverService / PublicPageContentService / InstitutionsApiService / PublicEnquiryService
                 →  page + layout components  →  shared UI
```

| API | Replaces |
|-----|----------|
| `GET /api/public/sites/resolve` | `MOCK_SITE_REGISTRY` |
| `GET /api/public/sites/trust/pages/home` | `trust-*.config.ts` (home sections) |
| `GET /api/public/sites/trust/pages/chrome` | `trust-chrome.config.ts`, mobile nav configs |
| `GET /api/public/sites/trust/pages/institutions` | hardcoded institutions page intro |
| `GET /api/public/sites/trust/institutions` | `institutions.mock.ts` |
| `GET /api/public/enquiry-interest-topics` | `DEFAULT_ENQUIRY_INTEREST_OPTIONS` |
| `POST /api/public/enquiries` | local-only form submit |

Fallback files remain in repo for `ssrkeducation-docs/todo/content-fallback/fallback-plan.md`.

---

## Chrome (every trust page)

Layout: `features/public-site/layout/trust-layout/`

| UI | What users see | Source | Type |
| --- | --- | --- | --- |
| Header brand | Site name, tagline, logo letter | `core/site-context/mock/public-site.mock-data.ts` (`MOCK_SITE_REGISTRY.trust`) → `SiteContextService.site` | Mock site context |
| Header nav | Home, About, Institutions, Admin, Enquire | Mostly **hardcoded** in `header/trust-header.component.html` | Hardcoded template |
| Mobile menu | Labels, links, CTA, phone / email | `libs/shared/ui/src/lib/config/trust-mobile-nav.config.ts` (institution URLs patched in `trust-layout.component.ts`) | Static config |
| Mobile enquire bar | “Enquire Now”, target section | `libs/shared/ui/src/lib/config/trust-mobile-enquire.config.ts` | Static config |
| Footer | Contact, social, institution links, copyright site name | `trust-chrome.config.ts` (`TRUST_CONTACT`, `TRUST_SOCIAL_LINKS`) + site name from `SiteContextService` | Mixed |

### Related chrome config (partially unused)

`layout/trust-layout/trust-chrome.config.ts` also defines:

- `TRUST_MAIN_NAV_LINKS`
- `TRUST_INSTITUTION_LINKS`
- `TRUST_FOOTER_QUICK_LINKS`

The **live header does not fully consume** these yet (nav labels/structure are still in the header template). Prefer driving header/footer/mobile nav from one chrome config when making content fully configurable.

---

## Trust home page (`/`)

Page: `features/public-site/home/pages/trust-home-page/`

Wired in `trust-home-page.component.ts` / `.html`, top to bottom:

| # | Section | Content fields | Config / data source | Type |
| --- | --- | --- | --- | --- |
| 1 | **Announcement ticker** | Label, aria label, message list (`id`, `text`) | `trust-announcements.config.ts` → `TRUST_ANNOUNCEMENTS` | Static |
| 2 | **Hero carousel** | Per slide: `id`, `badge`, `title`, `description`, `theme`, `primaryAction`, `secondaryAction` | `trust-hero.config.ts` → `TRUST_HERO_SLIDES` | Static |
| 3 | **Stats / “Why choose” bar** | Aria label; items: `value`, `label`, `description`, `valueSize` | `trust-stats.config.ts` → `TRUST_STATS_BAR` | Static |
| 4 | **About** | `sectionLabel`, `title`, `description`, `highlights`, `cta`, `founder` (quote, name, role, avatar, badge) | `trust-about.config.ts` → `TRUST_ABOUT` | Static |
| 5 | **Institutions** | Section copy: `sectionLabel`, `title`, `titleAccent`, `description`; **cards** from institutions list + presentation map | Section: `trust-institutions-section.config.ts`; cards: `InstitutionsApiService` + `home/mappers/trust-institution-card.mapper.ts` + `institutions/api/mock/institutions.mock.ts` | **Hybrid** |
| 6 | **Enquiry** | Section copy: `sectionLabel`, `title`, `description`, `highlights`; **college dropdown** from institutions | Section: `trust-enquiry-section.config.ts` (default on `TrustEnquirySectionComponent`); options: `enquiry-college-options.mapper.ts` | **Hybrid** |

Shared UI used on the home page (presentational; content passed in):

- `AnnouncementTickerComponent`
- `HeroCarouselComponent`
- `StatsBarComponent`
- `TrustAboutSectionComponent`
- `TrustInstitutionsSectionComponent`
- `TrustEnquirySectionComponent` (+ `EnquiryFormComponent`)

---

## Hero (detail)

File: `trust-hero.config.ts`

Each slide:

| Field | Role |
| --- | --- |
| `id` | Stable slide key |
| `badge` | Small label above title |
| `title` | Main headline |
| `description` | Supporting line |
| `theme` | Visual variant (e.g. `scholarship`, `institutions`) |
| `primaryAction` / `secondaryAction` | `{ label, href, variant }` — today CTAs use in-page hashes (`#enquiry`, `#institutions`) |

All hero copy is compile-time static.

---

## Institutions section (hybrid detail)

| Piece | Source |
| --- | --- |
| Section headings / description | `trust-institutions-section.config.ts` |
| Card **name** (and list identity) | `MOCK_INSTITUTIONS` via `InstitutionsApiService.getInstitutions()` |
| Card **presentation** (courses line, programs line, icon, colors, tenant URL key) | Hardcoded in `trust-institution-card.mapper.ts` by institution code (`ssrkdc`, `ssrkjc`) |

To make this fully configurable, presentation fields should move out of the mapper into API/CMS (or config keyed by institution code).

---

## Enquiry section (hybrid detail)

| Piece | Source |
| --- | --- |
| Section label, title, description, highlights | `trust-enquiry-section.config.ts` |
| College select options | Institutions mock → `mapInstitutionsToEnquiryCollegeOptions` |
| Form field labels, interest options, submit label | Defaults inside `libs/shared/ui` enquiry form (not trust-page config today) |

---

## Site context (trust tenant)

File: `core/site-context/mock/public-site.mock-data.ts` — entry `trust`:

| Field | Used for |
| --- | --- |
| `name` | Header / footer branding |
| `tagline` | Header subtitle |
| `theme.primaryColor` | CSS `--color-ssrk-blue-primary` via `SiteContextService` |
| `logoUrl` | Reserved (header still shows letter mark) |
| `enabledPages` | Which public routes are allowed |

Resolved at app init (`app.config.ts` → `SiteResolverService.resolve()` → `SiteContextService.setSite()`).

---

## What is not config-driven yet

- Header nav labels and structure (template-hardcoded)
- Logo mark (letter `S`, not `logoUrl`)
- Enquiry form field labels / default interest options (shared UI defaults)
- Institution card presentation (mapper constants)
- Institutions listing page beyond mock DTOs
- No single content API/CMS for page sections

---

## Configurability snapshot

| Layer | Configurable today? | How |
| --- | --- | --- |
| Site name / tagline / theme color | Yes | Mock registry (future sites resolve API) |
| Home section copy (announcements, hero, stats, about, enquiry text) | Yes, code-only | Edit `trust-*.config.ts` and redeploy |
| Institution card names | Yes, mock list | `MOCK_INSTITUTIONS` |
| Institution card presentation | No (code) | Mapper by `ssrkdc` / `ssrkjc` |
| Nav / footer / mobile menu | Partial | Split across configs and templates |

---

## File index (trust content)

| Path | Role |
| --- | --- |
| `core/config/public-site/trust/trust-announcements.config.ts` | Ticker messages (fallback) |
| `core/config/public-site/trust/trust-hero.config.ts` | Hero slides (fallback) |
| `core/config/public-site/trust/trust-stats.config.ts` | Stats bar (fallback) |
| `core/config/public-site/trust/trust-about.config.ts` | About + founder (fallback) |
| `core/config/public-site/trust/trust-institutions-section.config.ts` | Institutions section headings (fallback) |
| `core/config/public-site/trust/trust-enquiry-section.config.ts` | Enquiry section copy (fallback) |
| `home/mappers/trust-institution-card.mapper.ts` | Institution card presentation |
| `home/mappers/enquiry-college-options.mapper.ts` | Enquiry college options |
| `core/config/public-site/trust/trust-chrome.config.ts` | Footer contact/social; nav configs (fallback) |
| `core/config/public-site/institution/institution-hero.config.ts` | Institution tenant hero builder |
| `core/config/public-site/institution/institution-mobile-nav.config.ts` | Institution tenant mobile nav builder |
| `libs/shared/ui/.../trust-mobile-nav.config.ts` | Mobile drawer |
| `libs/shared/ui/.../trust-mobile-enquire.config.ts` | Sticky enquire bar |
| `core/site-context/mock/public-site.mock-data.ts` | Site name, tagline, theme |
| `institutions/api/mock/institutions.mock.ts` | Institution list |

---

## Direction for “highly configurable” content

1. Treat each home section as a **content block** with a stable key (`announcements`, `hero`, `stats`, `about`, `institutions`, `enquiry`).
2. Keep components presentational: they only receive typed inputs (as they largely do today).
3. Replace static `TRUST_*` constants with a **content service** (mock → API/CMS) that returns the same shapes as the current configs.
4. Unify chrome (header, footer, mobile nav, enquire bar) on one chrome content model so labels/links are not duplicated in templates.
5. Move institution presentation and enquiry form defaults into that content layer (or institution/site APIs), not mappers/templates.
