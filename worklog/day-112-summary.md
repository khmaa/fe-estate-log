# Day 112 Summary

## Goal

Consolidated the labeled Switch pattern into a shared SwitchField so accessibility relationships and field states can be reused consistently.

## Completed Work

- Added label, helper text, error, required, and disabled state APIs to `SwitchField`.
- Automatically associated the Switch with its label and reflected helper and error references through accessibility attributes.
- Merged existing `aria-describedby` references with the shared helper text reference.
- Added shared component unit tests and Storybook state examples.
- Replaced the pinned visit log filter and Showcase release notification implementations with `SwitchField`.
- Verified that the existing English and Korean copy and Switch interactions remain intact through app tests.

## Changed Files

- `libs/shared-ui/src/components/SwitchField.tsx`
- `libs/shared-ui/src/components/tests/SwitchField.test.tsx`
- `libs/shared-ui/src/components/SwitchField.stories.tsx`
- `libs/shared-ui/src/index.ts`
- `apps/web/src/features/visit-logs/components/VisitLogFilters.tsx`
- `apps/web/src/pages/ShowcasePage.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/SwitchField.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`feat/shared-ui-switch-field`

## Commit

```text
feat: 공통 SwitchField 컴포넌트 추가

- Switch 라벨과 상태 설명의 접근성 연결 통합
- 도움말, 오류, 필수 및 비활성 상태 지원
- 임장 필터와 Showcase의 중복 Switch field 구조 교체
- 단위 테스트와 Storybook 상태 예시 추가
- 112일차 공통 폼 컴포넌트 작업 기록
```
