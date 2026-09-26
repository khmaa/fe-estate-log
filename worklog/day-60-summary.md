# Day 60 Summary

## What I worked on
- Prepared the web app for Vercel deployment from the monorepo.
- Added a root-level Vercel configuration for installing, building, output routing, and SPA rewrites.
- Updated MSW browser mock activation so demo deployments can use mock data through `VITE_ENABLE_MSW=true`.
- Documented local mock mode and Vercel deployment settings.

## Key changes
- Added `vercel.json`.
- Added `apps/web/src/vite-env.d.ts`.
- Added `apps/web/src/mocks/index.test.ts`.
- Updated `apps/web/src/mocks/index.ts`.
- Added `apps/web/.env.example` and allowed `.env.example` files through `.gitignore`.
- Updated `README.md` and `README.ko.md` with deployment notes.

## Validation
- `pnpm -F web exec vitest run src/mocks/index.test.ts`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
