# 113일차 요약

## 목표

공통 Switch의 접근성 role과 실제 native input 동작이 항상 일치하도록 입력 type 계약을 강화했습니다.

## 완료한 작업

- `SwitchProps`에서 임의의 input `type`을 전달할 수 없도록 `type` 속성을 제외했습니다.
- Switch가 항상 native `checkbox` input으로 렌더링되도록 고정했습니다.
- 기본 Switch가 checkbox type과 switch role을 함께 제공하는지 테스트했습니다.
- 타입 검사를 우회한 잘못된 런타임 type이 전달되어도 checkbox 동작을 유지하는지 검증했습니다.
- 기존 checked, disabled, change 동작 테스트를 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Switch.tsx`
- `libs/shared-ui/src/components/tests/Switch.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Switch.test.tsx src/components/tests/SwitchField.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-switch-type-contract`

## 커밋

```text
fix: 공통 Switch 입력 타입 고정

- Switch props에서 임의의 input type 제거
- native checkbox와 switch role의 의미 일치 보장
- 잘못된 런타임 type에 대한 방어 테스트 추가
- SwitchField와 웹 사용처 회귀 검증
- 113일차 공통 Switch 계약 개선 작업 기록
```
