# 90일차 요약

## 목표

임장 기록 생성/수정 폼의 validation summary 배너가 오류 개수만이 아니라 확인해야 할 필드 이름까지 함께 안내하도록 보강했습니다.

## 완료한 작업

- `VisitLogFormFields`에서 validation error 필드 순서를 명시했습니다.
- summary 배너에 기존 필드 번역을 재사용한 오류 필드 목록을 추가했습니다.
- required field 오류 테스트가 summary 배너의 필드 이름 목록까지 검증하도록 확장했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogFormFields.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormFields.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogFormFields VisitLogCreateDialog VisitLogEditDialog App i18n`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-validation-summary`

## 커밋

```text
feat: Add visit log validation summary fields

- List invalid form fields in the validation summary
- Reuse localized form field labels for create and edit dialogs
- Cover validation summary field names in form tests
- Document day 90 validation summary follow-up
```
