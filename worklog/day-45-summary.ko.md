# 45일차 정리

## 작업 내용

- active filter chip 모델 생성 로직을 전용 helper로 분리했다.
- `VisitLogActiveFilters`는 계산 책임을 덜고, 계산된 chip 모델을 렌더링하는 역할만 담당하도록 단순화했다.
- 기본 필터 상태와 비기본 active 필터 상태를 pure helper 단위에서 검증하는 테스트를 추가했다.

## 주요 변경

- `apps/web/src/features/visit-logs/utils/getVisitLogActiveFilters.ts` 추가
- `apps/web/src/features/visit-logs/utils/getVisitLogActiveFilters.test.ts` 추가
- `VisitLogActiveFilters.tsx`가 인라인 계산 대신 helper 결과를 사용하도록 변경

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
