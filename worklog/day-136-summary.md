# Day 136 Summary

## Goal

Made visit dates in the list and detail views follow the app language.

## Completed Work

- Used Korean date formatting in Korean and preserved the existing format in English.
- Passed the active app language to the date formatter in both views.
- Preserved the original timestamp in the `time` element and kept translation resources unchanged.
- Extended formatter unit tests and language-switch regression tests for the list and detail views.

## Changed Files

- `apps/web/src/App.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCard.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.tsx`
- `apps/web/src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts`
- `apps/web/src/features/visit-logs/utils/formatVisitLogVisitedAt.ts`

## Verification

- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogCard.test.tsx src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## Branch

`fix/web-visit-log-date-locale`

## Commit

```text
fix: 임장 기록 방문일 표기에 앱 언어 반영

- 목록과 상세 방문일에 현재 앱 언어 적용
- 기존 영어 날짜 표기와 원본 일시 유지
- 한국어 날짜 표시 회귀 테스트와 136일차 작업 기록 추가
```
