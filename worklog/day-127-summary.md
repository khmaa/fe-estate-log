# Day 127 Summary

## Goal

Improved the shared `Field` so its label remains reliably connected to a child control while preserving an explicit child control ID.

## Completed Work

- Resolved the effective control ID by prioritizing an explicit child control `id`.
- Updated the `Field` label `htmlFor` to reference the effective control ID.
- Preserved the existing fallback that assigns the `htmlFor` value when the child control has no ID.
- Verified the accessible label connection when an explicit child ID differs from the fallback `htmlFor` value.

## Changed Files

- `libs/shared-ui/src/components/Field.tsx`
- `libs/shared-ui/src/components/tests/Field.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.
- Validated the proposed commit subject with `commitlint`.

## Branch

`fix/shared-ui-field-label-control-id`

## Commit

```text
fix: 공통 Field 레이블 연결 안정화

- 자식 control의 명시적인 ID를 레이블 연결에 반영
- ID가 없는 control의 기존 fallback 동작 유지
- 레이블과 control의 접근성 연결 회귀 테스트 추가
- 127일차 공통 Field 접근성 작업 기록
```
