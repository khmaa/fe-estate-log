# 128일차 요약

## 목표

공통 `RadioGroup`이 보이는 그룹 레이블을 접근성 이름으로 직접 사용해 중복된 레이블 텍스트 없이 일관된 의미를 제공하도록 개선했습니다.

## 완료한 작업

- 화면에 보이는 `RadioGroup` 레이블에 그룹 레이블 ID를 직접 부여했습니다.
- `aria-labelledby`가 보이는 레이블을 참조하도록 기존 연결을 유지했습니다.
- 같은 레이블을 반복하던 스크린리더 전용 요소를 제거했습니다.
- 그룹의 접근성 이름, 레이블 ID 연결, 단일 렌더링을 단위 테스트로 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/RadioGroup.tsx`
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/RadioGroup.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.
- 제안 커밋 제목을 `commitlint`로 검증했습니다.

## 브랜치

`fix/shared-ui-radio-group-label`

## 커밋

```text
fix: 공통 RadioGroup 레이블 의미 개선

- 보이는 그룹 레이블을 접근성 이름으로 직접 연결
- 중복된 스크린리더 전용 레이블 제거
- 그룹 레이블 연결 및 단일 렌더링 테스트 추가
- 128일차 공통 RadioGroup 접근성 작업 기록
```
