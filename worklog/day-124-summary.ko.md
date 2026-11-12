# 124일차 요약

## 목표

공통 Toast의 보조기술 알림 우선순위가 메시지 variant와 실제 긴급도에 맞게 적용되도록 개선했습니다.

## 완료한 작업

- info와 success Toast의 기본 Radix type을 `background`로 지정해 polite하게 발표하도록 했습니다.
- error Toast의 기본 type을 `foreground`로 유지해 assertive하게 발표하도록 했습니다.
- 소비자가 명시한 Toast type이 variant 기반 기본값보다 우선하도록 구성했습니다.
- Radix가 생성하는 실제 `aria-live` announcer를 단위 테스트에서 검증했습니다.
- 임장 기록 생성 성공 Toast가 앱에서 polite하게 발표되는지 통합 테스트로 확인했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Toast.tsx`
- `libs/shared-ui/src/components/tests/Toast.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Toast.test.tsx src/components/tests/ToastHost.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-toast-announcement-priority`

## 커밋

```text
fix: 공통 Toast 알림 우선순위 개선

- info와 success Toast를 polite 알림으로 조정
- error Toast의 assertive 알림 유지
- 명시적인 Radix type override 지원
- 단위 및 앱 통합 테스트와 124일차 작업 기록 추가
```
