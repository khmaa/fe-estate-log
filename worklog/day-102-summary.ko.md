# 102일차 요약

## 목표

공통 Field가 오류 상태인 form control을 해당 오류 메시지와 `aria-errormessage`로 자동 연결하도록 개선했습니다.

## 완료한 작업

- `Field`가 오류를 렌더링할 때 자식 control에 동일한 오류 메시지 id를 `aria-errormessage`로 전달하도록 했습니다.
- 오류가 없을 때는 자식 control에 기존 `aria-errormessage`가 있으면 보존하도록 했습니다.
- 임장 기록 폼에서 반복하던 오류 메시지 id helper와 필드별 속성을 제거했습니다.
- shared UI 테스트와 임장 기록 폼 테스트에서 공통 연결과 기존 접근성 관계를 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Field.tsx`
- `libs/shared-ui/src/components/tests/Field.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormFields.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-field-error-message-semantics`

## 커밋

```text
feat: Connect field error message semantics

- Link Field controls to rendered errors with aria-errormessage
- Preserve existing control error references when no Field error exists
- Remove repeated visit log error message wiring
- Document day 102 field accessibility follow-up
```
