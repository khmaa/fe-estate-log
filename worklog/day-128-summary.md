# Day 128 Summary

## Goal

Improved the shared `RadioGroup` to use its visible group label directly as the accessible name without rendering duplicate label text.

## Completed Work

- Assigned the group label ID directly to the visible `RadioGroup` label.
- Preserved the existing `aria-labelledby` relationship while pointing it to the visible label.
- Removed the screen-reader-only element that repeated the same label.
- Verified the accessible group name, label ID relationship, and single label rendering with a unit test.

## Changed Files

- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/RadioGroup.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.
- Validated the proposed commit subject with `commitlint`.

## Branch

`fix/shared-ui-radio-group-label`

## Commit

```text
fix: 공통 RadioGroup 레이블 의미 개선

- 보이는 그룹 레이블을 접근성 이름으로 직접 연결
- 중복된 스크린리더 전용 레이블 제거
- 그룹 레이블 연결 및 단일 렌더링 테스트 추가
- 128일차 공통 RadioGroup 접근성 작업 기록
```
