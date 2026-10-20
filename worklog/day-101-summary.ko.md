# 101일차 요약

## 목표

공통 Field의 필수 표시가 시각적 별표에 그치지 않고 실제 form control의 네이티브 필수 상태로 전달되도록 개선했습니다.

## 완료한 작업

- `Field`의 `required` 상태를 자식 form control의 `required` 속성으로 전달했습니다.
- 필수 상태가 control에서 전달되므로 시각적 별표는 보조기술에서 중복 읽히지 않도록 숨겼습니다.
- shared UI 테스트에서 필수 control과 장식용 별표의 접근성 상태를 검증했습니다.
- 임장 기록 폼 테스트에서 네 개 필수 필드와 선택 항목인 매물 유형을 구분해 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Field.tsx`
- `libs/shared-ui/src/components/tests/Field.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFormFields.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-field-required-semantics`

## 커밋

```text
fix: Propagate required field semantics

- Pass Field required state to the rendered form control
- Hide the visual required indicator from assistive technology
- Cover shared Field and visit log required control behavior
- Document day 101 field accessibility follow-up
```
