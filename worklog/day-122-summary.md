# Day 122 Summary

## Goal

Improved the shared Alert live-region urgency so it matches the message variant and usage context.

## Completed Work

- Changed the default role for info, success, and warning Alerts to the polite `status` role.
- Preserved the assertive `alert` role for error Alerts that need immediate attention.
- Made an explicitly provided role take precedence over the variant default.
- Confirmed that validation summary error Alerts preserve their existing semantics.
- Added shared component and Showcase integration coverage for success and error live regions.

## Changed Files

- `libs/shared-ui/src/components/Alert.tsx`
- `libs/shared-ui/src/components/tests/Alert.test.tsx`
- `apps/web/src/App.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Alert.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`fix/shared-ui-alert-live-region`

## Commit

```text
fix: 공통 Alert live region 의미 개선

- 비오류 Alert의 기본 role을 status로 조정
- error Alert의 assertive role 유지
- 명시적인 role override 지원 및 테스트 보강
- Showcase 통합 테스트와 122일차 작업 기록 추가
```
