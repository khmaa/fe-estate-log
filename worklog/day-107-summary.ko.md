# 107일차 요약

## 목표

공통 CheckboxField의 disabled 상태가 네이티브 control, 전체 field 시각 표현, 변경 동작에서 일관되게 적용되도록 개선했습니다.

## 완료한 작업

- disabled CheckboxField의 전체 영역에 비활성 cursor와 opacity 스타일을 적용했습니다.
- CheckboxField가 disabled일 때 change callback을 컴포넌트 수준에서도 차단했습니다.
- disabled checkbox의 네이티브 상태, field 스타일, callback 차단을 함께 테스트했습니다.
- 기존 CheckboxField disabled Story가 개선된 전체 field 상태를 보여 주도록 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/CheckboxField.tsx`
- `libs/shared-ui/src/components/tests/CheckboxField.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/CheckboxField.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-checkbox-field-disabled-state`

## 커밋

```text
fix: Align checkbox field disabled state

- Style the complete CheckboxField as disabled
- Block checkbox change callbacks while disabled
- Cover native, visual, and interaction disabled behavior
- Document day 107 shared form control follow-up
```
