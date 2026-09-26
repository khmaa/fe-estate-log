# Day 76 Summary

## Goal

Connect an accessible explanation to disabled submit buttons in the visit log create and edit forms so assistive technology can report why the action is unavailable.

## Completed

- Added optional props to `VisitLogFormActions` for linking a disabled submit reason with `aria-describedby`.
- Rendered the disabled reason as `sr-only` helper text so it is hidden visually but available to screen readers.
- Updated the create dialog to describe the disabled create button when required fields are missing.
- Updated the edit dialog to describe the disabled save button when required fields are missing.
- Added English and Korean submit disabled reason copy for create and edit validation.
- Covered the accessible description behavior in form actions, create dialog, and edit dialog tests.
- Added a `.gitignore` exception so the day 76 worklog is included in version control.

## Files Changed

- `.gitignore`
- `apps/web/src/features/visit-logs/components/VisitLogFormActions.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormActions.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## Validation

- Ran `pnpm -F web test:run -- VisitLogFormActions VisitLogCreateDialog VisitLogEditDialog i18n` successfully.
- Ran `pnpm run format:check` successfully.
- Ran `pnpm run lint` successfully.
- Ran `pnpm run build:web` successfully.
- Ran `git diff --check` successfully.

## Branch

`feat/web-visit-log-submit-disabled-reason`

## Commit

```text
feat: Add visit log submit disabled reason

- Describe disabled submit actions with accessible helper text
- Add localized create and edit submit disabled reason copy
- Cover the accessible submit descriptions in form and dialog tests
- Include the day 76 worklog in version control
```
