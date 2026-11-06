# 118일차 요약

## 목표

공통 Spinner가 독립적인 loading status와 합성 컴포넌트 내부의 장식 요소를 명확히 구분할 수 있도록 decorative 모드를 추가했습니다.

## 완료한 작업

- `Spinner`에 장식용 상태를 선언하는 `decorative` API를 추가했습니다.
- decorative Spinner에서 status role과 accessible label을 제거하고 `aria-hidden="true"`를 적용했습니다.
- 일반 Spinner의 기존 status role, 기본 label, 사용자 지정 label 동작을 유지했습니다.
- Button loading Spinner를 decorative 모드로 교체하고 불필요한 wrapper 요소를 제거했습니다.
- Spinner와 Button 단위 테스트에서 장식용 Spinner가 접근성 트리에 노출되지 않는지 검증했습니다.
- Storybook에 decorative Spinner 상태를 추가했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Spinner.tsx`
- `libs/shared-ui/src/components/tests/Spinner.test.tsx`
- `libs/shared-ui/src/components/Spinner.stories.tsx`
- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Spinner.test.tsx src/components/tests/Button.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-spinner-decorative-mode`

## 커밋

```text
feat: 공통 Spinner 장식 모드 추가

- Spinner에 decorative 접근성 상태 제공
- 장식용 Spinner의 status role과 label 제거
- Button loading Spinner의 불필요한 wrapper 정리
- 단위 테스트와 Storybook 상태 예시 추가
- 118일차 공통 Spinner 접근성 작업 기록
```
