# Day 30 Summary

## What I worked on

- Extracted the shared app shell UI into a dedicated route-level layout.
- Moved the visit logs, showcase, and not found routes under the new layout route.
- Reduced the web app entry point so `App.tsx` only owns router bootstrapping.

## Why it mattered

- The app shell and page routing responsibilities are now separated more cleanly.
- This makes future route-level additions such as workspace layouts, auth routes, and route error boundaries easier to introduce.
- The current app behavior stayed intact while the structure became easier to extend.

## Validation

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run test:all`
- `pnpm -F web build`
