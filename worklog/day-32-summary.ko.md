# 32일차 작업 정리

## 작업 내용

- web 주요 페이지에 route-level lazy loading을 적용했습니다.
- 라우트 로딩 상태를 위한 공통 suspense fallback을 추가했습니다.
- lazy-loaded detail route 흐름이 계속 보장되도록 앱 테스트도 같이 수정했습니다.

## 의미

- 메인 라우트 번들이 페이지별 청크로 분리됐습니다.
- 초기 진입 시 한 번에 로드하는 코드 양을 줄이고, 필요한 페이지 코드만 불러오게 됐습니다.
- 이후 페이지 수가 늘어나도 모든 코드를 하나의 클라이언트 번들에 몰지 않는 구조가 됐습니다.

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
