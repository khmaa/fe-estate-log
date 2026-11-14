# 125일차 요약

## 목표

공통 `showToast` 헬퍼에서도 사용 맥락에 따라 보조기술 알림 우선순위를 명시적으로 제어할 수 있도록 개선했습니다.

## 완료한 작업

- `ShowToastOptions`에 Radix Toast의 `type` 옵션을 추가했습니다.
- `ToastHostProvider`가 helper로 전달된 type을 실제 Toast에 전달하도록 연결했습니다.
- type을 생략하면 기존 variant 기반 기본 우선순위를 그대로 사용하도록 유지했습니다.
- error variant에 `background` type을 명시한 경우 polite announcer가 사용되는지 검증했습니다.
- 기존 Toast 표시, 기본 옵션, 외부 및 내부 dismiss 동작을 유지했습니다.

## 변경 파일

- `libs/shared-ui/src/components/useToast.ts`
- `libs/shared-ui/src/components/ToastHost.tsx`
- `libs/shared-ui/src/components/tests/ToastHost.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Toast.test.tsx src/components/tests/ToastHost.test.tsx src/components/tests/useToast.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-toast-host-announcement-type`

## 커밋

```text
feat: 공통 Toast 헬퍼 알림 타입 지원

- ShowToastOptions에 Radix announcement type 추가
- ToastHostProvider에서 명시적인 type 전달
- helper 경로의 polite override 테스트 보강
- 125일차 공통 Toast 접근성 작업 기록
```
