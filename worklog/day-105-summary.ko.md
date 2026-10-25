# 105일차 요약

## 목표

공통 선택 form control의 필수 상태가 네이티브 속성, 그룹 접근성 의미, 시각적 indicator에서 일관되게 표현되도록 개선했습니다.

## 완료한 작업

- required CheckboxField의 label에 보조기술에서 숨겨진 시각적 필수 indicator를 추가했습니다.
- RadioGroup에 `required` API와 `aria-required` 그룹 상태를 추가했습니다.
- required RadioGroup의 각 radio에 네이티브 `required` 속성을 전달했습니다.
- CheckboxField와 RadioGroup의 필수 상태 및 장식용 indicator를 테스트했습니다.

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

`feat/shared-ui-choice-required-semantics`

## 커밋

```text
feat: Add choice control required semantics

- Show decorative required indicators for shared choice controls
- Expose required radio group and native radio states
- Cover checkbox and radio group required behavior
- Document day 105 form accessibility follow-up
```
