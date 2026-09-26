# Day 22 Summary

## What I worked on
- Introduced `i18next` and `react-i18next` into the web app and initialized i18n at the app level.
- Added an app-shell language switcher with persisted locale selection.
- Moved locale messages into per-language JSON files instead of keeping resources inline in code.
- Extended i18n coverage across the `visit-logs` feature, including filters, list states, cards, detail labels, and the create/edit/delete dialogs.
- Added translation-aware tests so the Korean toggle is verified against the actual rendered dialog flow.

## Key changes
- Added `apps/web/src/app/i18n.ts` and `apps/web/src/app/i18n/resources.ts`.
- Added locale files:
  - `apps/web/src/app/i18n/locales/en/messages.json`
  - `apps/web/src/app/i18n/locales/ko/messages.json`
- Updated `apps/web/src/main.tsx` to initialize i18n.
- Updated `apps/web/src/App.tsx` to include the language switcher and localized shell copy.
- Localized visit-log feature components:
  - `VisitLogFilters.tsx`
  - `VisitLogsScreen.tsx`
  - `VisitLogList.tsx`
  - `VisitLogCard.tsx`
  - `VisitLogDetailScreen.tsx`
  - `VisitLogCreateDialog.tsx`
  - `VisitLogEditDialog.tsx`
  - `VisitLogDeleteDialog.tsx`
- Added `apps/web/src/features/visit-logs/utils/visitLogLabels.ts` to centralize translated status/property-type labels.
- Updated app and component tests to reflect the translated copy and the Korean dialog path.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## Notes
- The first i18n pass only covered the app shell and a few page-level strings, so dialog and card copy stayed untranslated.
- The second pass exposed missing locale keys and a missing `visitLogLabels` helper file, which broke tests and the web build until both were added.
- I finished by re-running the full web validation set so the feature-level i18n changes close cleanly before CI.
