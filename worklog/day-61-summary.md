# Day 61 Summary

## What I worked on
- Added a demo mode indicator for MSW-backed deployments.
- Introduced a small app config helper for detecting demo mode from `VITE_ENABLE_MSW`.
- Updated the app shell to show localized demo mode copy when mock data is enabled.
- Documented the Vercel mock-data indicator behavior.

## Key changes
- Added `apps/web/src/app/config/demoMode.ts`.
- Added `apps/web/src/app/config/demoMode.test.ts`.
- Added `apps/web/src/app/layouts/AppShell.test.tsx`.
- Updated `apps/web/src/app/layouts/AppShell.tsx`.
- Updated `apps/web/src/app/i18n/locales/en/common.json`.
- Updated `apps/web/src/app/i18n/locales/ko/common.json`.
- Updated `README.md` and `README.ko.md`.

## Validation
- `pnpm -F web exec vitest run src/app/config/demoMode.test.ts src/app/layouts/AppShell.test.tsx src/App.test.tsx`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
