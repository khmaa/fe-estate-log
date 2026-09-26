# Day 35 Summary

## What I worked on
- Localized the main `ShowcasePage` copy with the app i18n system.
- Moved showcase section text into the English and Korean locale files.
- Added an app-level test to verify the showcase route switches to Korean correctly.

## Why it mattered
- The showcase route now follows the same localization rules as the main product routes.
- This reduces the structural gap between the domain pages and the component demo surface.
- The showcase page is now easier to keep consistent as the app shell language toggles evolve.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
