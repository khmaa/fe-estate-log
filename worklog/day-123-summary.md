# Day 123 Summary

## Goal

Improved the shared Banner so it preserves its default live-region semantics while respecting an explicit role required by the usage context.

## Completed Work

- Preserved the existing polite `status` role as the Banner default.
- Made explicitly provided roles such as `region` or `alert` take precedence over the default.
- Verified that a Banner used as a labeled region retains its accessible name and explicit role.
- Confirmed through Showcase integration coverage that the existing Banner remains a status.
- Aligned explicit role handling between Alert and Banner.

## Changed Files

- `libs/shared-ui/src/components/Banner.tsx`
- `libs/shared-ui/src/components/tests/Banner.test.tsx`
- `apps/web/src/App.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Banner.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-banner-role-override`

## Commit

```text
fix: 공통 Banner role override 지원

- Banner의 기본 status 의미 유지
- 명시적인 role이 기본값보다 우선하도록 개선
- labeled region 및 Showcase 통합 테스트 보강
- 123일차 공통 UI 접근성 작업 기록
```
