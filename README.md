# SSRK Education Frontend

Nx monorepo for SSRK Edu Angular applications, structured per [ai-rules frontend architecture](https://github.com/ssrkedu/ai-rules/tree/main/frontend/01-architecture).

## Applications

| App | Folder | Purpose |
|-----|--------|---------|
| **admin-portal** | `apps/admin-portal` | Authenticated CMS for trust and institution content (`admin.ssrkedu.com`) |
| **public-portal** | `apps/public-portal` | Public-facing trust and institution website (replaces legacy `education-website` naming) |

## Shared libraries

Cross-app code lives under `libs/shared/`:

- `types` — API contracts (`ApiResponse`, `PagedResult`, …)
- `utils` — shared helpers (`unwrapApiResponse`, …)
- `ui` — shared design-system components (`ssrk-*` selectors)
- `design-tokens` — Tailwind theme tokens (SSRK brand colors, typography)

Apps depend on shared libraries only. Apps never import each other.

## Folder structure (per app)

```text
apps/{app}/src/app/
  core/           # infrastructure (api, guards, auth services)
  shared/         # app-local reusable UI and helpers
  features/
    auth/         # login and auth screens (admin only in MVP)
    {business}/   # admin or trust (per app)
      layout/
      {business}.routes.ts
      pages/{name}-page/   # when the feature is a single route group
  app.component.ts
  app.routes.ts
  app.config.ts
```

## Commands

```bash
npm install
npm run start:public    # public trust site (default port from Nx)
npm run start:admin     # admin portal
npm run build           # build both apps
npm run lint
npm run test
```

## Next step

Implement the **trust home page** in `apps/public-portal/src/app/features/trust/pages/trust-home-page/` using the HTML reference at `ssrkeducation-design-ref/education-website/trust/index.html`.
