# Day 118 Summary

## Goal

Added a decorative mode to the shared Spinner so standalone loading statuses and visual indicators inside composite components can be distinguished clearly.

## Completed Work

- Added a `decorative` API to declare visual-only Spinner instances.
- Removed the status role and accessible label from decorative Spinners and applied `aria-hidden="true"`.
- Preserved the existing status role, default label, and custom label behavior for regular Spinners.
- Replaced the Button loading Spinner wrapper with the decorative mode.
- Verified through Spinner and Button unit tests that decorative Spinners are excluded from the accessibility tree.
- Added a decorative Spinner state to Storybook.

## Changed Files

- `libs/shared-ui/src/components/Spinner.tsx`
- `libs/shared-ui/src/components/tests/Spinner.test.tsx`
- `libs/shared-ui/src/components/Spinner.stories.tsx`
- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Spinner.test.tsx src/components/tests/Button.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`feat/shared-ui-spinner-decorative-mode`

## Commit

```text
feat: 공통 Spinner 장식 모드 추가

- Spinner에 decorative 접근성 상태 제공
- 장식용 Spinner의 status role과 label 제거
- Button loading Spinner의 불필요한 wrapper 정리
- 단위 테스트와 Storybook 상태 예시 추가
- 118일차 공통 Spinner 접근성 작업 기록
```
