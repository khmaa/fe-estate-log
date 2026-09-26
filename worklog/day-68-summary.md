# Day 68 Summary

## Goal

Document the final demo URL update flow that should happen after a successful Vercel smoke test.

## Completed

- Added a post-smoke-test README update sequence to the English deployment checklist.
- Added the same flow to the Korean deployment checklist.
- Documented that both `README.md` and `README.ko.md` should be updated in the same PR.
- Clarified that the deployment checklist link should remain near the demo URL for future verification.
- Clarified that the README placeholder should stay unchanged if the smoke test fails.

## Validation

- Ran `pnpm run deploy:check` successfully.
- Confirmed formatting, lint, workspace tests, normal web build, and demo web build all passed.
- Ran `git diff --check` successfully before wrapping up.
- Confirmed the working tree was clean at wrap-up.

## Commit

```text
docs: Document demo URL update flow

- Add the post-smoke-test README update sequence
- Keep English and Korean deployment docs aligned
- Clarify that failed smoke tests should not update the README placeholder
```
