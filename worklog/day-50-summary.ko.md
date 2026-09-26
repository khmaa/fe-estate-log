# 50일차 정리

## 작업 내용

- visit log quick filter 모델 생성 로직을 전용 helper로 분리했다.
- `VisitLogQuickFilters`는 버튼 상태 렌더링과 클릭 handler 전달에 집중하도록 정리했다.
- 기본 active 상태, pinned/district active 상태, handler 연결을 helper 단위 테스트로 보강했다.

## 주요 변경

- `apps/web/src/features/visit-logs/utils/getVisitLogQuickFilters.ts` 추가
- `apps/web/src/features/visit-logs/utils/getVisitLogQuickFilters.test.ts` 추가
- `apps/web/src/features/visit-logs/components/VisitLogQuickFilters.tsx`가 새 helper에서 만든 모델을 렌더링하도록 변경

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
