# 77일차 요약

## 목표

임장 기록 생성/수정/삭제 dialog에서 mutation 실패 메시지가 보조 기술에 오류 알림으로 전달되도록 접근성 역할을 보강했습니다.

## 완료한 작업

- create dialog의 생성 실패 메시지에 `role="alert"`를 추가했습니다.
- edit dialog의 수정 실패 메시지에 `role="alert"`를 추가했습니다.
- delete dialog의 삭제 실패 메시지에 `role="alert"`를 추가했습니다.
- create/edit/delete state 테스트에서 실패 메시지가 alert 역할로 렌더링되는지 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCreateDialog.state.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogEditDialog.state.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDeleteDialog.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDeleteDialog.state.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogCreateDialog.state VisitLogEditDialog.state VisitLogDeleteDialog.state`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/web-visit-log-error-alerts`

## 커밋

```text
fix: Announce visit log dialog mutation errors

- Mark create, edit, and delete mutation failure messages as alerts
- Cover mutation error alert roles in dialog state tests
- Document day 77 visit log accessibility follow-up
```
