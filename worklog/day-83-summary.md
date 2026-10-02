# Day 83 Summary

## Goal

Connect the visit logs workspace main area to the page title so assistive technology can navigate the primary landmark with a clearer name.

## Completed

- Added `aria-labelledby` to the `VisitLogsScreen` `main` landmark.
- Connected a stable id to the visit logs workspace title.
- Updated the screen test to verify the named `main` landmark.
- Updated the App test to verify the English and Korean `main` landmark names after language switching.

## Files Changed

- `apps/web/src/features/visit-logs/components/VisitLogsScreen.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogsScreen.test.tsx`
- `apps/web/src/App.test.tsx`

## Validation

- Ran `pnpm -F web test:run -- VisitLogsScreen App` successfully.
- Ran `pnpm run format:check` successfully.
- Ran `pnpm run lint` successfully.
- Ran `pnpm run build:web` successfully.
- Ran `git diff --check` successfully.

## Branch

`feat/web-visit-log-main-landmark`

## Commit

```text
feat: Add visit log main landmark label

- Link the visit logs main landmark to the workspace heading
- Verify the named main region in screen and app tests
- Cover localized main landmark naming after language switching
- Document day 83 visit log accessibility follow-up
```
