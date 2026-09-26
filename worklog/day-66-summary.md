# Day 66 Summary

## Goal

Document the concrete Vercel project setup flow so the repository can be connected to Vercel without guessing the root, build command, or demo-mode configuration.

## Completed

- Added a `Create the Vercel Project` section to the English deployment checklist.
- Added a matching `Vercel 프로젝트 생성` section to the Korean deployment checklist.
- Documented the GitHub repository import flow from the Vercel dashboard.
- Clarified that the Vercel project root should be the repository root, not `apps/web`.
- Documented the expected install command, build command, output directory, and post-deployment smoke test requirement.
- Noted that `VITE_ENABLE_MSW` does not need to be added separately as a Vercel environment variable while `build:web:demo` already sets it.

## Validation

- Ran `pnpm run deploy:check` successfully.
- Confirmed formatting, lint, workspace tests, normal web build, and demo web build all passed.
- Ran `git diff --check` successfully before wrapping up.
- Confirmed the working tree was clean at wrap-up.

## Commit

```text
docs: Add Vercel project setup guide

- Document the repository import flow for Vercel
- Clarify root, build command, and output directory settings
- Note demo-mode environment handling before sharing the URL
```
