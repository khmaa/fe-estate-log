# Day 135 Summary

## Goal

Made visit dates in list cards and detail views machine-readable while preserving their display.

## Completed Work

- Used a `time` element with the original timestamp in its `datetime` attribute.
- Replaced the duplicate card formatter with the existing detail formatter.
- Preserved the displayed dates, metadata `dd` structure, and translation strings.
- Verified the displayed dates and original timestamps in the card and detail metadata tests.

## Changed Files

- `apps/web/src/features/visit-logs/components/VisitLogCard.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCard.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx`

## Verification

- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogCard.test.tsx src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## Branch

`fix/web-visit-log-date-semantics`

## Commit

```text
fix: 임장 기록 방문일에 날짜 의미 추가

- 목록과 상세 방문일에 time 요소와 원본 일시 적용
- 기존 날짜 표시 형식을 유지하고 포맷 함수 통일
- 방문일 구조 회귀 테스트와 135일차 작업 기록 추가
```
