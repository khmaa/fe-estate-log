# Day 65 Summary

## Goal

Add a single pre-deployment verification command so the project can run the same checks locally before opening deployment-related pull requests.

## Completed

- Added a root `deploy:check` script.
- The script runs formatting checks, lint, workspace tests, the normal web build, and the Vercel demo build in one command.
- Updated the English deployment checklist to use `pnpm run deploy:check`.
- Updated the Korean deployment checklist to use the same shared command.

## Validation

- Ran `pnpm run deploy:check` successfully.
- Confirmed the command completed formatting, lint, tests, normal web build, and demo web build.
- Ran `git diff --check` successfully before wrapping up.
- Confirmed the working tree was clean at wrap-up.

## Commit

```text
chore: Add deployment check script

- Add a root deploy check command for release verification
- Run format, lint, tests, normal build, and demo build together
- Update deployment docs to use the shared check command
```
