# Day 126 Summary

## Goal

Improved the shared `showToast` helper so Toast defaults remain stable even when optional values are explicitly `undefined`.

## Completed Work

- Reordered Toast state construction so consumer options are merged first.
- Resolved `dismissLabel`, `duration`, and `variant` with nullish defaults after merging consumer options.
- Preserved valid title, description, type, and custom option values.
- Verified that explicitly undefined optional values retain the info variant and default dismiss label.
- Preserved the existing Toast announcement priority override and dismiss flows.

## Changed Files

- `libs/shared-ui/src/components/ToastHost.tsx`
- `libs/shared-ui/src/components/tests/ToastHost.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/ToastHost.test.tsx src/components/tests/Toast.test.tsx src/components/tests/useToast.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-toast-host-option-defaults`

## Commit

```text
fix: 공통 Toast 헬퍼 기본 옵션 보존

- showToast 사용자 옵션과 기본값 병합 순서 수정
- 명시적 undefined가 기본 옵션을 지우지 않도록 처리
- 기본 variant와 dismiss label 회귀 테스트 추가
- 126일차 공통 Toast 안정성 작업 기록
```
