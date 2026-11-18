# Day 129 Summary

## Goal

Improved the shared text form controls so their color transitions respect the user's reduced-motion preference.

## Completed Work

- Disabled the `Input` color transition in reduced-motion environments.
- Disabled the `Textarea` color transition in reduced-motion environments.
- Disabled the `Select` color transition in reduced-motion environments.
- Preserved the existing 200ms color transitions in default environments.
- Verified the default transitions and reduced-motion variants in all three component unit tests.

## Changed Files

- `libs/shared-ui/src/components/Input.tsx`
- `libs/shared-ui/src/components/Textarea.tsx`
- `libs/shared-ui/src/components/Select.tsx`
- `libs/shared-ui/src/components/tests/Input.test.tsx`
- `libs/shared-ui/src/components/tests/Textarea.test.tsx`
- `libs/shared-ui/src/components/tests/Select.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Input.test.tsx src/components/tests/Textarea.test.tsx src/components/tests/Select.test.tsx src/components/tests/Field.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.
- Validated the proposed commit subject with `commitlint`.

## Branch

`fix/shared-ui-form-control-reduced-motion`

## Commit

```text
fix: 공통 폼 control 모션 감소 대응

- Input과 Textarea 색상 전환에 모션 감소 상태 적용
- Select 색상 전환에 모션 감소 상태 적용
- 기본 transition 및 모션 감소 variant 테스트 보강
- 129일차 공통 폼 control 접근성 작업 기록
```
