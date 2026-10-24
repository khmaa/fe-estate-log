# 104일차 요약

## 목표

공통 선택 form control의 오류 상태도 Field와 동일하게 해당 오류 메시지를 `aria-errormessage`로 참조하도록 개선했습니다.

## 완료한 작업

- `CheckboxField`가 오류 상태일 때 checkbox와 오류 메시지를 `aria-errormessage`로 연결했습니다.
- Checkbox에 기존 `aria-errormessage`가 있으면 Field 오류가 없는 동안 보존하도록 했습니다.
- `RadioGroup`이 오류 상태일 때 radiogroup과 그룹 오류 메시지를 `aria-errormessage`로 연결했습니다.
- 두 컴포넌트의 오류 연결과 기존 참조 보존 동작을 테스트했습니다.

## 변경 파일

- `libs/shared-ui/src/components/CheckboxField.tsx`
- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/tests/CheckboxField.test.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/CheckboxField.test.tsx src/components/tests/RadioGroup.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-choice-error-semantics`

## 커밋

```text
feat: Connect choice control error semantics

- Link checkbox and radio group errors with aria-errormessage
- Preserve custom checkbox error references without Field errors
- Cover shared choice control error relationships
- Document day 104 form accessibility follow-up
```
