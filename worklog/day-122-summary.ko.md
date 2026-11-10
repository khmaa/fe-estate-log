# 122일차 요약

## 목표

공통 Alert의 live-region 긴급도가 메시지 variant와 실제 사용 맥락에 맞게 노출되도록 개선했습니다.

## 완료한 작업

- info, success, warning Alert의 기본 role을 polite `status`로 변경했습니다.
- 즉시 확인이 필요한 error Alert는 기존 assertive `alert` role을 유지했습니다.
- 소비자가 명시한 role이 variant 기반 기본값보다 우선하도록 구성했습니다.
- validation summary의 error Alert 의미가 유지되는지 확인했습니다.
- 공통 컴포넌트와 Showcase 통합 테스트에서 success와 error live-region을 각각 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Alert.tsx`
- `libs/shared-ui/src/components/tests/Alert.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Alert.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-alert-live-region`

## 커밋

```text
fix: 공통 Alert live region 의미 개선

- 비오류 Alert의 기본 role을 status로 조정
- error Alert의 assertive role 유지
- 명시적인 role override 지원 및 테스트 보강
- Showcase 통합 테스트와 122일차 작업 기록 추가
```
