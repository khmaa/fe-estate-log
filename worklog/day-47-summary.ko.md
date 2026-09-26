# 47일차 정리

## 작업 내용

- visit log 필터의 query string 파싱과 직렬화 로직을 전용 util로 분리했다.
- `useVisitLogFilters`는 URL 규칙을 pure helper에 위임하고, React Router와 연결하는 adapter 역할만 남기도록 정리했다.
- invalid fallback, 기본값 param 제거, query trim, page reset 규칙을 util 단위 테스트로 보강했다.

## 주요 변경

- `apps/web/src/features/visit-logs/utils/visitLogFilterSearchParams.ts` 추가
- `apps/web/src/features/visit-logs/utils/visitLogFilterSearchParams.test.ts` 추가
- `apps/web/src/features/visit-logs/hooks/useVisitLogFilters.ts`가 새 parse/build util을 사용하도록 변경

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
