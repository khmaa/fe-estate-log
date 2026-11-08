# 119일차 요약

## 목표

공통 UI의 지속적인 loading 애니메이션이 사용자의 모션 감소 설정을 존중하도록 개선했습니다.

## 완료한 작업

- `Spinner`가 기본 환경에서는 회전하고 모션 감소 환경에서는 정지하도록 했습니다.
- `Skeleton`이 기본 환경에서는 pulse 애니메이션을 사용하고 모션 감소 환경에서는 정지하도록 했습니다.
- 두 컴포넌트의 기존 시각적 표현과 접근성 의미를 유지했습니다.
- 단위 테스트에서 기본 애니메이션과 모션 감소 variant가 함께 제공되는지 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Spinner.tsx`
- `libs/shared-ui/src/components/tests/Spinner.test.tsx`
- `libs/shared-ui/src/components/Skeleton.tsx`
- `libs/shared-ui/src/components/tests/Skeleton.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Spinner.test.tsx src/components/tests/Skeleton.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-reduced-motion-animations`

## 커밋

```text
fix: 공통 로딩 애니메이션 모션 감소 대응

- Spinner 회전 애니메이션에 모션 감소 상태 적용
- Skeleton pulse 애니메이션에 모션 감소 상태 적용
- 단위 테스트로 기본 애니메이션과 감소 상태 검증
- 119일차 공통 UI 접근성 작업 기록
```
