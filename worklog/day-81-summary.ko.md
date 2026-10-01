# 81일차 요약

## 목표

임장 기록 활성 필터 영역을 보조 기술이 하나의 명확한 필터 묶음으로 탐색할 수 있도록 영역 제목과 목록 구조를 보강했습니다.

## 완료한 작업

- `VisitLogActiveFilters` 루트 컨테이너를 제목이 연결된 `section`으로 변경했습니다.
- 활성 필터 제목을 `aria-labelledby` 대상으로 연결했습니다.
- 활성 필터 버튼 묶음을 `ul`/`li` 구조로 정리했습니다.
- 활성 필터 테스트에서 region landmark와 list item 개수를 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogActiveFilters.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogActiveFilters.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogActiveFilters VisitLogFilters VisitLogsScreen App`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-active-filter-region`

## 커밋

```text
feat: Add visit log active filter region

- Expose active filters as a labelled section
- Render active filter chips as a list of removable filter actions
- Cover the active filter region and list structure in tests
- Document day 81 visit log accessibility follow-up
```
