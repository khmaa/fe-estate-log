# 31일차 작업 정리

## 작업 내용
- web 앱에 route-level error boundary를 도입했습니다.
- 앱 라우터를 `RouterProvider` 기반 browser router 구조로 전환했습니다.
- 라우트 응답 실패와 일반 예외를 처리하는 전용 route error 페이지를 추가했습니다.

## 의미
- 라우트 렌더링 실패를 페이지 내부 query 에러와 분리해서 처리할 수 있게 됐습니다.
- 라우트가 정상 렌더링 전에 실패해도 앱 셸 수준에서 안정적인 복귀 경로를 제공합니다.
- 이후 route loader, action, 상위 라우팅 관심사를 붙이기 쉬운 구조가 됐습니다.

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
