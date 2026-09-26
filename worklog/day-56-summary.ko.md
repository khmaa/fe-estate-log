# 56일차 정리

## 작업 내용

- destructive delete dialog action 영역을 재사용 가능한 컴포넌트로 분리했다.
- delete dialog가 공통 action 컴포넌트를 조합하도록 바꾸되, mutation과 dialog lifecycle 동작은 기존 dialog에 유지했다.
- Codecov patch coverage에서 partial line으로 잡히던 불필요한 confirm handler 조건 분기를 제거했다.

## 주요 변경

- `apps/web/src/features/visit-logs/components/VisitLogDeleteActions.tsx` 추가
- `apps/web/src/features/visit-logs/components/VisitLogDeleteActions.test.tsx` 추가
- `VisitLogDeleteDialog.tsx`가 공통 delete actions를 사용하도록 변경
- disabled 상태에서 실행되지 않는 confirm 분기를 단순화해 patch coverage partial을 제거

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
