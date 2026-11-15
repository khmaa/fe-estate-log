# 126일차 요약

## 목표

공통 `showToast` 헬퍼의 optional 값이 명시적으로 `undefined`여도 Toast 기본 옵션이 안정적으로 유지되도록 개선했습니다.

## 완료한 작업

- Toast 상태를 구성할 때 사용자 옵션을 먼저 병합하도록 순서를 정리했습니다.
- `dismissLabel`, `duration`, `variant`는 사용자 옵션 병합 후 nullish 기본값으로 확정하도록 했습니다.
- 정상적으로 전달된 title, description, type 및 사용자 지정 옵션은 그대로 보존했습니다.
- optional 값을 명시적으로 `undefined`로 전달해도 info variant와 기본 dismiss label이 유지되는지 검증했습니다.
- 기존 Toast 알림 우선순위 override와 dismiss 흐름을 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/ToastHost.tsx`
- `libs/shared-ui/src/components/tests/ToastHost.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/ToastHost.test.tsx src/components/tests/Toast.test.tsx src/components/tests/useToast.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-toast-host-option-defaults`

## 커밋

```text
fix: 공통 Toast 헬퍼 기본 옵션 보존

- showToast 사용자 옵션과 기본값 병합 순서 수정
- 명시적 undefined가 기본 옵션을 지우지 않도록 처리
- 기본 variant와 dismiss label 회귀 테스트 추가
- 126일차 공통 Toast 안정성 작업 기록
```
