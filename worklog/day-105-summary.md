# Day 105 Summary

## Goal

Improved shared choice form controls so required state is represented consistently through native attributes, group accessibility semantics, and visual indicators.

## Completed Work

- Added an assistive-technology-hidden visual required indicator to required CheckboxField labels.
- Added a `required` API and `aria-required` group state to RadioGroup.
- Passed the native `required` attribute to every radio in a required RadioGroup.
- Tested CheckboxField and RadioGroup required states and decorative indicators.

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

`feat/shared-ui-choice-required-semantics`

## Commit

```text
feat: Add choice control required semantics

- Show decorative required indicators for shared choice controls
- Expose required radio group and native radio states
- Cover checkbox and radio group required behavior
- Document day 105 form accessibility follow-up
```
