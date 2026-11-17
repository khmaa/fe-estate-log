# 127일차 요약

## 목표

공통 `Field`가 자식 control의 명시적인 ID를 보존하면서 레이블도 같은 control에 안정적으로 연결되도록 개선했습니다.

## 완료한 작업

- 자식 control의 명시적인 `id`를 우선하는 실제 control ID를 계산했습니다.
- `Field` 레이블의 `htmlFor`가 실제 control ID를 참조하도록 수정했습니다.
- 자식 control에 ID가 없을 때는 기존 `htmlFor` 값을 ID로 사용하는 동작을 유지했습니다.
- 명시적인 자식 ID와 다른 fallback `htmlFor`가 함께 전달되어도 레이블 접근성 이름이 연결되는지 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Field.tsx`
- `libs/shared-ui/src/components/tests/Field.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFormFields.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.
- 제안 커밋 제목을 `commitlint`로 검증했습니다.

## 브랜치

`fix/shared-ui-field-label-control-id`

## 커밋

```text
fix: 공통 Field 레이블 연결 안정화

- 자식 control의 명시적인 ID를 레이블 연결에 반영
- ID가 없는 control의 기존 fallback 동작 유지
- 레이블과 control의 접근성 연결 회귀 테스트 추가
- 127일차 공통 Field 접근성 작업 기록
```
