# Day 37 Summary

## What I worked on
- Split the web i18n locale messages by domain instead of keeping everything in one `messages.json` file per language.
- Added `common`, `routes`, `showcase`, and `visitLogs` locale files for both English and Korean.
- Updated the i18n resource loader to merge the split files back into the default translation namespace so existing translation keys keep working.
- Added a resource structure test to verify that the split locale files are still exposed through the expected key paths.

## Why it mattered
- Locale messages are now easier to maintain as `showcase`, `visitLogs`, and route copy continue to grow.
- The app keeps the same translation key API while gaining a cleaner file structure.
- The change reduces future merge friction in large locale files.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## CI Note
- A Codecov upload failed once because the Codecov CLI GPG signature verification failed during download.
- Re-running the failed job passed, so it was treated as a transient external Codecov/CDN issue rather than a repository code or coverage problem.
