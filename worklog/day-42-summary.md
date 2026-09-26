# Day 42 Summary

## What I changed
- Added per-filter clear helpers to the `visit-logs` filter hook.
- Turned active filter badges into dismissible actions on the visit logs screen.
- Wired chip-based clearing for query, sort, pinned, page size, and page state.
- Added i18n copy for per-chip remove labels.
- Extended hook, screen, page, and app tests for individual filter clearing.

## Why it matters
- Users can now remove a single active filter without resetting the whole list state.
- The active filter summary is now interactive instead of read-only.
- URL-driven filters remain consistent even when users clear state from the screen UI.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
