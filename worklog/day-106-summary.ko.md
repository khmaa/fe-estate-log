# 106일차 요약

## 목표

공통 RadioGroup을 그룹 단위로 비활성화하고 접근성 상태, 네이티브 control, 시각 상태가 함께 동기화되도록 개선했습니다.

## 완료한 작업

- `RadioGroup`에 그룹 전체를 잠그는 `disabled` API를 추가했습니다.
- disabled 그룹에 `aria-disabled`를 제공하고 모든 radio에 네이티브 `disabled`를 전달했습니다.
- 그룹 및 option 단위 disabled 상태를 합쳐 기존 개별 option 비활성화 동작을 유지했습니다.
- disabled 상태에서 radio 변경 handler가 실행되지 않는지 테스트했습니다.
- Storybook에 전체 disabled RadioGroup 예시를 추가했습니다.

## 변경 파일

- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`
- `libs/shared-ui/src/components/RadioGroup.stories.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/RadioGroup.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-radio-group-disabled-state`

## 커밋

```text
feat: Add radio group disabled state

- Disable all radio options through a group-level API
- Expose group and native control disabled semantics
- Cover blocked value changes and document the Storybook state
- Document day 106 shared form control follow-up
```
