# 135일차 요약

## 목표

임장 기록 목록 카드와 상세 화면의 방문일을 화면 표시와 기계 판독에 모두 적합하게 표현했습니다.

## 완료한 작업

- 방문일 표시에 `time` 요소를 사용하고 `datetime`에 원본 일시를 전달했습니다.
- 목록 카드의 중복 포맷 함수를 기존 상세 화면 유틸로 통일했습니다.
- 기존 표시 날짜, 메타데이터의 `dd` 구조, 번역 문구를 유지했습니다.
- 목록 카드와 상세 메타데이터 테스트에서 표시 날짜와 원본 일시를 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogCard.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCard.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx`

## 검증

- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogCard.test.tsx src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## 브랜치

`fix/web-visit-log-date-semantics`

## 커밋

```text
fix: 임장 기록 방문일에 날짜 의미 추가

- 목록과 상세 방문일에 time 요소와 원본 일시 적용
- 기존 날짜 표시 형식을 유지하고 포맷 함수 통일
- 방문일 구조 회귀 테스트와 135일차 작업 기록 추가
```
