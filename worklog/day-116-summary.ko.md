# 116일차 요약

## 목표

공통 Button의 loading 상태를 보조기술에서도 처리 중인 상태로 인식할 수 있도록 접근성 의미를 강화했습니다.

## 완료한 작업

- loading Button에 `aria-busy="true"`가 자동으로 적용되도록 했습니다.
- loading 중에는 소비자가 전달한 `aria-busy={false}`보다 실제 busy 상태가 우선하도록 구성했습니다.
- loading이 아닐 때는 기존 `aria-busy` 값을 그대로 보존했습니다.
- loading Button의 native disabled 상태와 클릭 callback 차단을 함께 테스트했습니다.
- 기본 Button에는 불필요한 `aria-busy` 속성이 추가되지 않는지 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-button-loading-semantics`

## 커밋

```text
feat: 공통 Button 로딩 접근성 상태 추가

- loading Button에 aria-busy 상태 자동 제공
- 실제 loading 상태가 사용자 지정 busy 값보다 우선하도록 처리
- 평상시 aria-busy 속성 보존 및 기본 상태 검증
- loading 중 클릭 차단과 앱 버튼 흐름 회귀 검증
- 116일차 공통 Button 접근성 작업 기록
```
