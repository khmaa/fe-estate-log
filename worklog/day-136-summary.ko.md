# 136일차 요약

## 목표

임장 기록 목록과 상세 화면의 방문일이 앱 언어에 맞게 표시되도록 개선했습니다.

## 완료한 작업

- 한국어 설정에서는 한국어 날짜 형식을 사용하고 영어 설정에서는 기존 형식을 유지했습니다.
- 목록과 상세 화면의 날짜 포맷 함수에 현재 앱 언어를 전달했습니다.
- `time` 요소의 원본 일시와 기존 번역 리소스를 유지했습니다.
- 포맷 단위 테스트와 목록·상세 언어 전환 회귀 테스트를 보강했습니다.

## 변경 파일

- `apps/web/src/App.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCard.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailMetaGrid.tsx`
- `apps/web/src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts`
- `apps/web/src/features/visit-logs/utils/formatVisitLogVisitedAt.ts`

## 검증

- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogCard.test.tsx src/features/visit-logs/components/VisitLogDetailMetaGrid.test.tsx src/features/visit-logs/utils/formatVisitLogVisitedAt.test.ts src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## 브랜치

`fix/web-visit-log-date-locale`

## 커밋

```text
fix: 임장 기록 방문일 표기에 앱 언어 반영

- 목록과 상세 방문일에 현재 앱 언어 적용
- 기존 영어 날짜 표기와 원본 일시 유지
- 한국어 날짜 표시 회귀 테스트와 136일차 작업 기록 추가
```
