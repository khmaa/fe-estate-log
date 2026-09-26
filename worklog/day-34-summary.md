# Day 34 Summary

## What I worked on
- Added a repository-level `codecov.yml` policy.
- Tuned the patch coverage requirement to a more practical target for this frontend monorepo.
- Documented the Codecov policy in both the English and Korean READMEs.

## Why it mattered
- Coverage rules now live in the repository instead of depending on hidden dashboard defaults.
- Patch coverage stays strict enough to catch weak changes without blocking the workflow on every small branch gap.
- The coverage policy is now visible to anyone reading the repository documentation.

## Validation
- `pnpm run format:check`
- `pnpm run lint`
