# Day 115 Summary

## Goal

Added a safe default type contract to the shared Button so it does not trigger unintended form submissions.

## Completed Work

- Set the default native Button type to `button`.
- Preserved explicitly provided `submit` and `reset` types.
- Verified that the default Button does not submit an enclosing form.
- Verified that an explicit submit Button invokes the form submit handler.
- Preserved the existing variant, size, and loading behavior tests.

## Changed Files

- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-button-default-type`

## Commit

```text
fix: 공통 Button 기본 타입 안전성 개선

- 기본 button type으로 의도하지 않은 form submit 방지
- 명시적인 submit 및 reset type 전달 유지
- form 내부 기본 버튼과 submit 버튼 동작 테스트
- 앱 버튼 흐름과 Storybook 회귀 검증
- 115일차 공통 Button 계약 개선 작업 기록
```
