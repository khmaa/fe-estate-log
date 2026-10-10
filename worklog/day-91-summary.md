# Day 91 Summary

## Goal

Make the visit log create/edit form validation summary clearer by giving the alert a visible title.

## Completed

- Added `AlertTitle` to the `VisitLogFormFields` validation summary banner.
- Added English and Korean summary title translations for create and edit dialog validation copy.
- Extended the validation summary test to verify the heading is rendered.

## Changed Files

- `apps/web/src/features/visit-logs/components/VisitLogFormFields.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormFields.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## Verification

- `pnpm -F web test:run -- VisitLogFormFields VisitLogCreateDialog VisitLogEditDialog App i18n` completed successfully.
- `pnpm run format:check` completed successfully.
- `pnpm run lint` completed successfully.
- `pnpm run build:web` completed successfully.
- `git diff --check` completed successfully.

## Branch

`feat/web-visit-log-validation-summary-title`

## Commit

```text
feat: Add visit log validation summary title

- Add a heading to the form validation summary alert
- Localize summary titles for create and edit dialogs
- Cover the validation summary heading in form tests
- Document day 91 validation summary follow-up
```
