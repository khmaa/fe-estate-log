# 129일차 요약

## 목표

공통 텍스트 폼 control의 색상 전환이 사용자의 모션 감소 설정을 존중하도록 개선했습니다.

## 완료한 작업

- `Input`의 색상 전환을 모션 감소 환경에서 비활성화했습니다.
- `Textarea`의 색상 전환을 모션 감소 환경에서 비활성화했습니다.
- `Select`의 색상 전환을 모션 감소 환경에서 비활성화했습니다.
- 기본 환경의 기존 200ms 색상 전환은 그대로 유지했습니다.
- 세 컴포넌트의 단위 테스트에서 기본 transition과 모션 감소 variant를 함께 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Input.tsx`
- `libs/shared-ui/src/components/Textarea.tsx`
- `libs/shared-ui/src/components/Select.tsx`
- `libs/shared-ui/src/components/tests/Input.test.tsx`
- `libs/shared-ui/src/components/tests/Textarea.test.tsx`
- `libs/shared-ui/src/components/tests/Select.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Input.test.tsx src/components/tests/Textarea.test.tsx src/components/tests/Select.test.tsx src/components/tests/Field.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.
- 제안 커밋 제목을 `commitlint`로 검증했습니다.

## 브랜치

`fix/shared-ui-form-control-reduced-motion`

## 커밋

```text
fix: 공통 폼 control 모션 감소 대응

- Input과 Textarea 색상 전환에 모션 감소 상태 적용
- Select 색상 전환에 모션 감소 상태 적용
- 기본 transition 및 모션 감소 variant 테스트 보강
- 129일차 공통 폼 control 접근성 작업 기록
```
