# Day 19 Summary

## What I worked on
- Added a route-based app shell to the web app using `react-router-dom`.
- Introduced `AppRoutes` to separate route definitions from the top-level app layout.
- Routed the root path to `VisitLogsPage` and restored `ShowcasePage` under `/showcase`.
- Added a dedicated `NotFoundPage` for unknown routes instead of redirecting everything back to the root.
- Expanded the app test suite to cover the showcase route, active navigation state, and unknown-route rendering.

## Key changes
- Added `react-router-dom` to `apps/web`.
- Added `apps/web/src/app/AppRoutes.tsx`.
- Updated `apps/web/src/App.tsx` to use a browser router and top-level navigation.
- Added `apps/web/src/pages/NotFoundPage.tsx`.
- Updated `apps/web/src/App.test.tsx` to cover `/showcase` and missing routes.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
- `pnpm run test:all`

## Notes
- A broken workspace symlink prevented `shared-ui` from resolving `vitest` during the pre-push hook.
- Re-running `CI=true pnpm install` recreated the workspace links and restored `pnpm run test:all`.
