# Day 120 Summary

## Goal

Improved the shared overlay components so their enter and exit animations respect the user's reduced motion preference.

## Completed Work

- Disabled the Dialog overlay and content state animations when reduced motion is requested.
- Disabled the Popover and DropdownMenu content zoom and fade animations when reduced motion is requested.
- Disabled the Toast slide and fade animations when reduced motion is requested.
- Preserved the existing enter and exit animations in the default environment.
- Added unit coverage verifying the default state animation and reduced motion variant on all four components.

## Changed Files

- `libs/shared-ui/src/components/Dialog.tsx`
- `libs/shared-ui/src/components/tests/Dialog.test.tsx`
- `libs/shared-ui/src/components/Popover.tsx`
- `libs/shared-ui/src/components/tests/Popover.test.tsx`
- `libs/shared-ui/src/components/DropdownMenu.tsx`
- `libs/shared-ui/src/components/tests/DropdownMenu.test.tsx`
- `libs/shared-ui/src/components/Toast.tsx`
- `libs/shared-ui/src/components/tests/Toast.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Dialog.test.tsx src/components/tests/Popover.test.tsx src/components/tests/DropdownMenu.test.tsx src/components/tests/Toast.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-overlay-reduced-motion`

## Commit

```text
fix: 공통 오버레이 모션 감소 대응

- Dialog overlay와 content 애니메이션에 모션 감소 상태 적용
- Popover와 DropdownMenu 상태 애니메이션 정지 처리
- Toast slide 및 fade 애니메이션 정지 처리
- 단위 테스트와 120일차 접근성 작업 기록 추가
```
