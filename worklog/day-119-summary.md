# Day 119 Summary

## Goal

Improved the shared UI loading animations so they respect the user's reduced motion preference.

## Completed Work

- Kept the Spinner rotating by default and stopped it when reduced motion is requested.
- Kept the Skeleton pulse animation by default and stopped it when reduced motion is requested.
- Preserved the existing visual presentation and accessibility semantics of both components.
- Added unit tests verifying that the default animation and reduced motion variant are provided together.

## Changed Files

- `libs/shared-ui/src/components/Spinner.tsx`
- `libs/shared-ui/src/components/tests/Spinner.test.tsx`
- `libs/shared-ui/src/components/Skeleton.tsx`
- `libs/shared-ui/src/components/tests/Skeleton.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Spinner.test.tsx src/components/tests/Skeleton.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-reduced-motion-animations`

## Commit

```text
fix: 공통 로딩 애니메이션 모션 감소 대응

- Spinner 회전 애니메이션에 모션 감소 상태 적용
- Skeleton pulse 애니메이션에 모션 감소 상태 적용
- 단위 테스트로 기본 애니메이션과 감소 상태 검증
- 119일차 공통 UI 접근성 작업 기록
```
