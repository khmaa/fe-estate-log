# 87일차 요약

## 목표

임장 기록 목록의 empty/error 상태를 이름 있는 region으로 노출해, 결과 영역이 로딩 이후 어떤 상태인지 보조 기술이 더 명확히 탐색할 수 있도록 보강했습니다.

## 완료한 작업

- 목록 request error `EmptyState`에 제목 기반 `aria-label`과 `role="region"`을 추가했습니다.
- 목록 empty `EmptyState`에 제목 기반 `aria-label`과 `role="region"`을 추가했습니다.
- 목록 테스트에서 empty/error 상태의 이름 있는 region을 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogList.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogList.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogList VisitLogsScreen App`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-list-state-regions`

## 커밋

```text
feat: Add visit log list state regions

- Expose empty and error list states as named regions
- Label list state regions from their visible titles
- Verify named empty and error regions in list tests
- Document day 87 visit log accessibility follow-up
```
