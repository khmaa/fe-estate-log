# 30일차 작업 정리

## 작업 내용

- 공통 앱 셸 UI를 route-level layout으로 분리했습니다.
- 임장 기록, 쇼케이스, not found 라우트를 새 layout route 아래로 옮겼습니다.
- `App.tsx`가 라우터 부트스트랩만 담당하도록 엔트리 책임을 줄였습니다.

## 의미

- 앱 셸과 페이지 라우팅 책임이 더 명확하게 분리됐습니다.
- 이후 workspace 전용 layout, auth route, route error boundary 같은 상위 구조를 붙이기 쉬워졌습니다.
- 현재 사용자 동작은 유지하면서 구조만 더 확장 가능하게 정리했습니다.

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run test:all`
- `pnpm -F web build`
