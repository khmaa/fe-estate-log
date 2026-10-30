# Day 111 Summary

## Goal

Improved the Showcase release notification switch so its visible title and description are also used in the accessibility tree.

## Completed Work

- Replaced the release notification title with a real `Label` associated with the Switch.
- Added an identifier to the notification description and referenced it through the Switch `aria-describedby` attribute.
- Removed the separate `aria-label` that duplicated the visible label.
- Removed the unused English and Korean `ariaLabel` translation keys.
- Verified the English and Korean accessible names and descriptions in the app integration tests.
- Confirmed the Switch interaction and checked state change in the English flow.

## Changed Files

- `apps/web/src/pages/ShowcasePage.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/src/app/i18n/locales/en/showcase.json`
- `apps/web/src/app/i18n/locales/ko/showcase.json`

## Verification

- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/web-showcase-switch-accessibility`

## Commit

```text
fix: Connect showcase switch accessibility text

- Associate the release notification label with its switch
- Expose the visible switch description to assistive technology
- Remove redundant English and Korean aria label translations
- Cover localized switch semantics and interaction
- Document day 111 showcase accessibility follow-up
```
