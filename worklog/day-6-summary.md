# Day 6 Summary

## Overview

- Added `Checkbox` as the first shared selectable input component.
- Expanded Storybook and test coverage for checkbox state combinations.
- Set up GitHub Actions and Codecov integration for repository coverage reporting.
- Fixed CI failures caused by missing React type packages and missing `lcov` coverage output.

## Completed Work

### 1. Added `Checkbox`

- Created `libs/shared-ui/src/components/Checkbox.tsx`
- Implemented a shared checkbox wrapper with token-based styling
- Supported:
- checked state
- disabled state
- `className`
- `onChange`

### 2. Added `Checkbox` stories

- Created `libs/shared-ui/src/components/Checkbox.stories.tsx`
- Added stories for:
- `Default`
- `Checked`
- `Disabled`
- `DisabledChecked`
- `WithLabel`

### 3. Added `Checkbox` tests

- Created `libs/shared-ui/src/components/tests/Checkbox.test.tsx`
- Verified:
- checkbox rendering
- checked state
- disabled state
- disabled + checked state
- `onChange` behavior

### 4. Improved `Field` test coverage

- Updated `libs/shared-ui/src/components/tests/Field.test.tsx`
- Added a case to verify merging an existing `aria-describedby` value
- Brought `Field.tsx` coverage to 100%

### 5. Added CI and Codecov setup

- Created `.github/workflows/ci.yml`
- Added CI steps for:
- install
- lint
- test
- web build
- coverage upload to Codecov
- Updated `README.md` and `README.ko.md`
- Added coverage badge
- Documented Codecov-based repository coverage reporting

### 6. Fixed CI type dependency failure

- Added missing type packages to `@shared-ui/core`
- Added:
- `@types/react`
- `@types/react-dom`
- Resolved CI build failures caused by missing React type declarations during `web` build

### 7. Fixed Codecov upload failure

- Updated:
- `apps/web/vitest.config.ts`
- `libs/shared-ui/vitest.config.ts`
- Added `lcov` to the coverage reporters
- Verified that these files are generated:
- `apps/web/coverage/lcov.info`
- `libs/shared-ui/coverage/lcov.info`

## Validation

- `pnpm -F @shared-ui/core test:run`
- passed
- `pnpm -F @shared-ui/core storybook:build`
- passed
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Checkbox.test.tsx`
- passed
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx --coverage`
- passed
- `pnpm -F web build`
- passed
- `pnpm run lint`
- passed
- `pnpm run test:all`
- passed

## Decisions

- A disabled checkbox can also be checked, and that combination should be documented and tested
- Repository-level coverage visibility on GitHub should use GitHub Actions plus Codecov
- `lcov` output is required for reliable Codecov uploads in this project
- Shared UI packages should declare their own React type dependencies for stable CI builds

## Suggested Next Steps

- Add a `CheckboxField` or field-level layout pattern for checkbox + helper/error messaging
- Add `Select`, `Radio`, or `Switch` as the next interactive input type
- Verify that the first successful upload updates the Codecov badge on the repository README
