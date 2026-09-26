# Day 63 Summary

## What I worked on

- Added a Live Demo section to the root README files.
- Documented that the public Vercel URL should be added only after the first deployment is verified.
- Added deployment checklist guidance for where to record the verified demo URL.
- Extended the post-deployment smoke test with a README demo link verification item.

## Key changes

- Updated `README.md`.
- Updated `README.ko.md`.
- Updated `docs/deployment.md`.
- Updated `docs/deployment.ko.md`.

## Validation

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm -F web test:run`
