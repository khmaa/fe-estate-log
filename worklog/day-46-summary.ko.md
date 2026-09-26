# 46일차 정리

## 작업 내용

- visit log 필터의 기본값과 default 상태 비교 로직을 공통 util로 모았다.
- 필터 hook, active filter helper, query string 생성, optimistic cache 로직이 같은 기본값/비교 기준을 공유하도록 정리했다.
- 기본값 파싱, default 상태 판단, active 필터 판단을 util 단위 테스트로 보강했다.

## 주요 변경

- `apps/web/src/features/visit-logs/utils/visitLogFilters.ts` 추가
- `apps/web/src/features/visit-logs/utils/visitLogFilters.test.ts` 추가
- `useVisitLogFilters.ts`, `getVisitLogActiveFilters.ts`, `getVisitLogs.ts`, `visitLogQueryCache.ts`가 공통 filter util을 사용하도록 변경

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
