# Day 64 Summary

## Goal

Standardize the demo deployment build command so Vercel, local verification, and documentation use the same root script.

## Completed

- Added a root `build:web:demo` script that builds the web app with `VITE_ENABLE_MSW=true`.
- Updated `vercel.json` to use `pnpm run build:web:demo` as the Vercel build command.
- Updated the English and Korean README deployment sections to reference the shared demo build script.
- Updated the English and Korean deployment checklist to use the shared demo build script for pre-deployment verification and troubleshooting.

## Validation

- Confirmed `main` included the Day 63 live demo documentation merge before starting Day 64.
- Ran formatting, lint, standard web build, demo web build, and whitespace checks after the changes.
- Confirmed the working tree was clean at wrap-up.

## Commit

```text
chore: Align Vercel demo build command

- Add a shared root demo build script
- Point Vercel deployment to the shared script
- Update deployment docs to use the same command
```
