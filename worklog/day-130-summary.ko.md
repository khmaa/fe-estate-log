# 130일차 요약

## 목표

공통 상호작용 control에 남아 있던 색상 전환이 사용자의 모션 감소 설정을 일관되게 존중하도록 개선했습니다.

## 완료한 작업

- `Button`과 `Checkbox`의 색상 전환을 모션 감소 환경에서 비활성화했습니다.
- `RadioGroup` 옵션의 선택 상태 전환을 모션 감소 환경에서 즉시 반영하도록 했습니다.
- `ToastClose`와 `DropdownMenuItem`의 hover 및 focus 색상 전환을 모션 감소 환경에서 비활성화했습니다.
- 기본 환경의 기존 색상 전환은 그대로 유지했습니다.
- 다섯 컴포넌트의 단위 테스트에서 기본 transition과 모션 감소 variant를 검증했습니다.

## 변경 파일

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

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx src/components/tests/Checkbox.test.tsx src/components/tests/RadioGroup.test.tsx src/components/tests/Toast.test.tsx src/components/tests/DropdownMenu.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.
- 제안 커밋 제목을 `commitlint`로 검증했습니다.

## 브랜치

`fix/shared-ui-interaction-reduced-motion`

## 커밋

```text
fix: 공통 상호작용 control 모션 감소 대응

- Button과 Checkbox 색상 전환에 모션 감소 상태 적용
- RadioGroup 옵션 선택 상태 전환 즉시 반영
- ToastClose와 DropdownMenuItem 색상 전환 정지
- 단위 및 앱 회귀 테스트와 130일차 작업 기록 추가
```
