# 16일차 작업 정리

## 작업 내용

- `web` 앱을 단순 쇼케이스 화면에서 실제 도메인 기반 `visit-logs` 페이지로 확장했습니다.
- `visit-logs` feature에 대해 다음 레이어 구조를 도입했습니다.
  - `api`
  - `services`
  - `hooks`
  - `components`
  - `types`
- `TanStack Query`를 도입하고 루트 `QueryClientProvider`를 연결했습니다.
- `visit-logs` API를 실제 `fetch('/api/visit-logs')` 호출 형태로 바꿨습니다.
- 브라우저와 테스트에서 공통으로 쓸 수 있도록 `MSW`를 붙여서, 백엔드 없이도 실제 요청 경계를 유지하는 구조로 만들었습니다.
- `visit-logs` feature 전용 테스트를 추가해서 patch coverage를 보강했습니다.

## 핵심 변경

- 앱 전역 provider 추가
  - `apps/web/src/app/queryClient.ts`
  - `apps/web/src/app/AppProviders.tsx`
- 첫 도메인 페이지 추가
  - `apps/web/src/pages/VisitLogsPage.tsx`
- `visit-logs` feature 모듈 추가
  - API 레이어
  - 서비스 레이어
  - 쿼리 훅
  - 도메인 컴포넌트
  - 도메인 타입
- MSW 설정 추가
  - 브라우저 worker 초기화
  - 테스트 서버
  - feature 전용 handler
  - `dev:mock` 스크립트
- 다음 범위의 테스트 추가
  - API fetch 동작
  - 서비스 정렬 로직
  - 필터 상호작용
  - 카드 액션
  - 리스트 상태
  - 화면 단위 상호작용

## 검증

- `pnpm run lint`
- `pnpm run format:check`
- `pnpm -F web test:run`
- `pnpm -F web build`

## 메모

- 현재 `visit-logs` 흐름은 아직 MSW mock 데이터를 쓰지만, 구조 자체는 실제 백엔드 클라이언트처럼 동작합니다.
- 이번 patch coverage 실패 원인은 페이지 런타임 문제가 아니라 feature 레이어 테스트 부족이었습니다.
