# 115일차 요약

## 목표

공통 Button이 form 내부에서 의도하지 않은 submit을 발생시키지 않도록 안전한 기본 type 계약을 추가했습니다.

## 완료한 작업

- Button의 기본 native type을 `button`으로 지정했습니다.
- 소비자가 명시한 `submit` 또는 `reset` type은 기존처럼 전달되도록 유지했습니다.
- 기본 Button이 enclosing form을 제출하지 않는지 테스트했습니다.
- 명시적인 submit Button이 form submit handler를 실행하는지 검증했습니다.
- 기존 variant, size, loading 동작 테스트를 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-button-default-type`

## 커밋

```text
fix: 공통 Button 기본 타입 안전성 개선

- 기본 button type으로 의도하지 않은 form submit 방지
- 명시적인 submit 및 reset type 전달 유지
- form 내부 기본 버튼과 submit 버튼 동작 테스트
- 앱 버튼 흐름과 Storybook 회귀 검증
- 115일차 공통 Button 계약 개선 작업 기록
```
