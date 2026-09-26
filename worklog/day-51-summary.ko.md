# 51일차 정리

## 작업 내용
- visit log 필터의 sort 라벨 생성 기준을 공통화했다.
- select control, quick filters, active filter chips가 같은 sort label helper를 사용하도록 정리했다.
- active sort locale 문구를 재사용 가능한 템플릿 구조로 단순화했다.

## 주요 변경
- `apps/web/src/features/visit-logs/utils/visitLogLabels.ts`에 sort label helper 추가
- `getVisitLogActiveFilters.ts`가 공통 active sort label helper를 사용하도록 변경
- `getVisitLogQuickFilters.ts`가 공통 quick sort label helper를 사용하도록 변경
- `VisitLogFilters.tsx`가 공통 select sort label helper를 사용하도록 변경
- `apps/web/src/features/visit-logs/utils/visitLogLabels.test.ts` 추가

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
