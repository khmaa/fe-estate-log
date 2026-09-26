# Day 41 Summary

## What I changed

- Added an active filter summary UI to the `visit-logs` screen.
- Show non-default filter state as badges for query, sort, pinned, page size, and page.
- Added locale copy for the filter summary labels in English and Korean.
- Extended screen and app tests to verify the summary rendering from URL-backed filters.

## Why it matters

- Users can now see at a glance which filters are currently affecting the list.
- The new summary makes the reset action easier to understand because the current filtered state is visible.
- The URL-driven filter model is now easier to reason about in the UI, not just in the address bar.

## Validation

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
