# Day 16 Summary

## What I worked on

- Shifted the web app from a pure showcase entry to a real domain-oriented `visit-logs` page.
- Introduced a feature-based layered structure for the `visit-logs` feature:
  - `api`
  - `services`
  - `hooks`
  - `components`
  - `types`
- Added TanStack Query to the web app and wired a root `QueryClientProvider`.
- Reworked the feature API to use real `fetch('/api/visit-logs')` requests.
- Added MSW for browser and test mocking so the app can run backendless while keeping a real request boundary.
- Added targeted tests for the `visit-logs` feature to improve patch coverage.

## Key changes

- Added app-level providers:
  - `apps/web/src/app/queryClient.ts`
  - `apps/web/src/app/AppProviders.tsx`
- Added the first domain page:
  - `apps/web/src/pages/VisitLogsPage.tsx`
- Added `visit-logs` feature modules:
  - API layer
  - service layer
  - query hook
  - domain components
  - domain types
- Added MSW setup:
  - browser worker bootstrap
  - test server
  - feature-specific handlers
  - `dev:mock` script
- Added focused tests for:
  - API fetch behavior
  - service sorting logic
  - filter interactions
  - card actions
  - list states
  - screen-level interactions

## Validation

- `pnpm run lint`
- `pnpm run format:check`
- `pnpm -F web test:run`
- `pnpm -F web build`

## Notes

- The current `visit-logs` flow already looks like a real backend client, even though it still runs on MSW-backed mock data.
- Patch coverage failures were caused by missing tests at the feature layer rather than page-level runtime failures.
