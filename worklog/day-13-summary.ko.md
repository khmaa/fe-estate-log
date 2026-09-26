# 13일차 작업 정리

## 개요

- 공용 `Toast` 컴포넌트 세트를 shared-ui에 추가했습니다.
- portal, viewport, dismiss 동작은 Radix Toast primitive를 기반으로 가져가서 접근성과 기본 동작을 안정적으로 확보했습니다.
- 첫 버전은 수동 open/close와 공용 feedback variant에 집중하는 좁은 범위로 정리했습니다.

## 완료한 작업

- `libs/shared-ui`에 `@radix-ui/react-toast` 의존성을 추가했습니다.
- `ToastProvider`, `ToastViewport`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`를 구현했습니다.
- `info`, `success`, `error` variant를 지원하도록 만들었습니다.
- interactive toast 흐름을 확인할 수 있는 Storybook 스토리를 추가했습니다.
- 렌더링, variant 스타일, dismiss 동작을 검증하는 테스트를 추가했습니다.
- shared-ui 엔트리 포인트에서 Toast 관련 컴포넌트와 타입을 export 하도록 반영했습니다.

## 검증

- `pnpm run lint`
- `pnpm -F @shared-ui/core test:run`
- `pnpm -F @shared-ui/core storybook:build`

## 메모

- Toast는 외부에서 open 상태를 제어하는 구조가 더 자연스러워서, dismiss 테스트도 작은 상태 wrapper를 사용해 구성했습니다.
- Storybook build에서는 Radix/Vite의 `use client` 경고가 보였지만 빌드는 정상 완료됐습니다.

## 다음 작업 후보

- `web` showcase 페이지에 toast 데모 추가
- 앱에서 반복 사용될 경우를 대비한 toast helper 또는 manager API 설계
- `CheckboxField`, `RadioGroup`의 남은 branch coverage 정리
