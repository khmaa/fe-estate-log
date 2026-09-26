# 19일차 작업 정리

## 작업 내용
- `react-router-dom`을 도입해서 web 앱을 라우트 기반 앱 셸로 정리했다.
- 라우트 정의를 `AppRoutes`로 분리해서 최상위 앱 레이아웃과 분리했다.
- 루트 경로는 `VisitLogsPage`, `/showcase`는 `ShowcasePage`로 연결했다.
- 모든 잘못된 경로를 홈으로 돌려보내는 대신, 전용 `NotFoundPage`를 추가했다.
- 앱 테스트를 확장해서 showcase 라우트, active navigation 상태, unknown route 렌더링까지 검증했다.

## 주요 변경
- `apps/web`에 `react-router-dom` 추가
- `apps/web/src/app/AppRoutes.tsx` 추가
- `apps/web/src/App.tsx`를 browser router + 상단 navigation 구조로 변경
- `apps/web/src/pages/NotFoundPage.tsx` 추가
- `apps/web/src/App.test.tsx`에 `/showcase` 및 없는 경로 테스트 추가

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
- `pnpm run test:all`

## 메모
- pre-push hook에서 `shared-ui`가 `vitest`를 해석하지 못하던 원인은 workspace symlink 꼬임이었다.
- `CI=true pnpm install`로 workspace link를 다시 만들고 `pnpm run test:all`까지 복구했다.
