# Day 130 Summary

## Goal

Improved the remaining shared interactive controls so their color transitions consistently respect the user's reduced-motion preference.

## Completed Work

- Disabled the `Button` and `Checkbox` color transitions in reduced-motion environments.
- Made `RadioGroup` option selection state changes immediate in reduced-motion environments.
- Disabled `ToastClose` and `DropdownMenuItem` hover and focus color transitions in reduced-motion environments.
- Preserved the existing color transitions in default environments.
- Verified the default transitions and reduced-motion variants in all five component unit tests.

## Changed Files

- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/Checkbox.tsx`
- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/Toast.tsx`
- `libs/shared-ui/src/components/DropdownMenu.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`
- `libs/shared-ui/src/components/tests/Checkbox.test.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`
- `libs/shared-ui/src/components/tests/Toast.test.tsx`
- `libs/shared-ui/src/components/tests/DropdownMenu.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx src/components/tests/Checkbox.test.tsx src/components/tests/RadioGroup.test.tsx src/components/tests/Toast.test.tsx src/components/tests/DropdownMenu.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.
- Validated the proposed commit subject with `commitlint`.

## Branch

`fix/shared-ui-interaction-reduced-motion`

## Commit

```text
fix: 공통 상호작용 control 모션 감소 대응

- Button과 Checkbox 색상 전환에 모션 감소 상태 적용
- RadioGroup 옵션 선택 상태 전환 즉시 반영
- ToastClose와 DropdownMenuItem 색상 전환 정지
- 단위 및 앱 회귀 테스트와 130일차 작업 기록 추가
```
