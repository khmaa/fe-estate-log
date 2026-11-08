# 120일차 요약

## 목표

공통 오버레이 컴포넌트의 진입 및 퇴장 애니메이션이 사용자의 모션 감소 설정을 존중하도록 개선했습니다.

## 완료한 작업

- Dialog overlay와 content의 상태 애니메이션을 모션 감소 환경에서 비활성화했습니다.
- Popover와 DropdownMenu content의 확대 및 fade 애니메이션을 모션 감소 환경에서 비활성화했습니다.
- Toast의 slide 및 fade 애니메이션을 모션 감소 환경에서 비활성화했습니다.
- 기본 환경의 기존 진입 및 퇴장 애니메이션은 그대로 유지했습니다.
- 네 컴포넌트의 단위 테스트에서 기본 상태 애니메이션과 모션 감소 variant를 함께 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Dialog.tsx`
- `libs/shared-ui/src/components/tests/Dialog.test.tsx`
- `libs/shared-ui/src/components/Popover.tsx`
- `libs/shared-ui/src/components/tests/Popover.test.tsx`
- `libs/shared-ui/src/components/DropdownMenu.tsx`
- `libs/shared-ui/src/components/tests/DropdownMenu.test.tsx`
- `libs/shared-ui/src/components/Toast.tsx`
- `libs/shared-ui/src/components/tests/Toast.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Dialog.test.tsx src/components/tests/Popover.test.tsx src/components/tests/DropdownMenu.test.tsx src/components/tests/Toast.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-overlay-reduced-motion`

## 커밋

```text
fix: 공통 오버레이 모션 감소 대응

- Dialog overlay와 content 애니메이션에 모션 감소 상태 적용
- Popover와 DropdownMenu 상태 애니메이션 정지 처리
- Toast slide 및 fade 애니메이션 정지 처리
- 단위 테스트와 120일차 접근성 작업 기록 추가
```
