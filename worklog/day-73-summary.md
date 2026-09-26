# Day 73 Summary

## Goal

Clarify the duplicate draft creation feedback so users can distinguish a copied visit log draft from a normal new draft after the mutation completes.

## Completed

- Split the create success toast copy between normal create and duplicate draft create flows.
- Added duplicate-specific toast title and description to the English visit log i18n messages.
- Added duplicate-specific toast title and description to the Korean visit log i18n messages.
- Updated `useVisitLogCreateFlow` to detect duplicate mode from existing initial values before clearing dialog state.
- Added a hook-level test for the duplicate draft toast branch.

## Files Changed

- `apps/web/src/features/visit-logs/hooks/useVisitLogCreateFlow.ts`
- `apps/web/src/features/visit-logs/hooks/useVisitLogCreateFlow.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## Validation

- Ran `pnpm -F web test:run -- useVisitLogCreateFlow` successfully.
- Ran `pnpm run deploy:check` successfully.
- Ran `git diff --check` successfully.
- Confirmed the changed create flow hook reports 100% coverage in the web coverage report.

## Branch

`feat/web-duplicate-draft-toast-copy`

## Commit

```text
feat: Clarify duplicate draft toast feedback

- Show duplicate-specific success toast after creating from copied values
- Add English and Korean i18n messages for duplicate draft feedback
- Cover the duplicate toast branch in the create flow hook test
```
