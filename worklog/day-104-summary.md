# Day 104 Summary

## Goal

Improved shared choice form controls so their error states reference rendered error messages through `aria-errormessage`, consistently with Field.

## Completed Work

- Connected CheckboxField controls to their error messages through `aria-errormessage`.
- Preserved an existing Checkbox `aria-errormessage` while CheckboxField has no error.
- Connected an invalid RadioGroup to its group error message through `aria-errormessage`.
- Tested both component error relationships and the existing checkbox reference preservation behavior.

## Changed Files

- `libs/shared-ui/src/components/CheckboxField.tsx`
- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/tests/CheckboxField.test.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/CheckboxField.test.tsx src/components/tests/RadioGroup.test.tsx`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`feat/shared-ui-choice-error-semantics`

## Commit

```text
feat: Connect choice control error semantics

- Link checkbox and radio group errors with aria-errormessage
- Preserve custom checkbox error references without Field errors
- Cover shared choice control error relationships
- Document day 104 form accessibility follow-up
```
