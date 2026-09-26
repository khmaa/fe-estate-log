# Day 62 Summary

## What I worked on

- Added a Vercel deployment checklist for the web demo.
- Documented Vercel project settings, demo-mode assumptions, pre-deployment validation, post-deployment smoke tests, and troubleshooting steps.
- Linked the English and Korean deployment checklists from the root README files.

## Key changes

- Added `docs/deployment.md`.
- Added `docs/deployment.ko.md`.
- Updated `README.md`.
- Updated `README.ko.md`.

## Validation

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm -F web test:run`
