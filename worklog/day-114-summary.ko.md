# 114일차 요약

## 목표

공통 Checkbox의 컴포넌트 의미와 실제 native input 동작이 항상 일치하도록 입력 type 계약을 강화했습니다.

## 완료한 작업

- `CheckboxProps`에서 임의의 input `type`을 전달할 수 없도록 `type` 속성을 제외했습니다.
- Checkbox가 항상 native `checkbox` input으로 렌더링되도록 고정했습니다.
- 기본 Checkbox가 checkbox role과 native type을 함께 제공하는지 테스트했습니다.
- 타입 검사를 우회한 잘못된 런타임 type이 전달되어도 checkbox 동작을 유지하는지 검증했습니다.
- 기존 checked, disabled, disabled checked, change 동작 테스트를 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Checkbox.tsx`
- `libs/shared-ui/src/components/tests/Checkbox.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Checkbox.test.tsx src/components/tests/CheckboxField.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-checkbox-type-contract`

## 커밋

```text
fix: 공통 Checkbox 입력 타입 고정

- Checkbox props에서 임의의 input type 제거
- native checkbox 의미와 상호작용 보장
- 잘못된 런타임 type에 대한 방어 테스트 추가
- CheckboxField와 Showcase 회귀 검증
- 114일차 공통 Checkbox 계약 개선 작업 기록
```
