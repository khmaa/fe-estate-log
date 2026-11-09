# Day 121 Summary

## Goal

Improved the shared Switch state transition so it respects the user's reduced motion preference.

## Completed Work

- Made the Switch track color update immediately when reduced motion is requested.
- Made the Switch thumb position update immediately when reduced motion is requested.
- Preserved the existing 200ms color and position transitions in the default environment.
- Preserved the existing checked, disabled, and change callback behavior.
- Added unit coverage for the default transition and reduced motion variant on both the track and thumb.

## Changed Files

- `libs/shared-ui/src/components/Switch.tsx`
- `libs/shared-ui/src/components/tests/Switch.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Switch.test.tsx src/components/tests/SwitchField.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-switch-reduced-motion`

## Commit

```text
fix: 공통 Switch 모션 감소 대응

- Switch track 색상 전환에 모션 감소 상태 적용
- Switch thumb 위치 전환에 모션 감소 상태 적용
- 단위 및 웹 통합 테스트로 기존 동작 검증
- 121일차 공통 UI 접근성 작업 기록
```
