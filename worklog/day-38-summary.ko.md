# 38일차 작업 정리

## 작업 내용

- 공통 optimistic cache helper를 도입해 visit log mutation 캐시 처리 방식을 정리했습니다.
- create mutation은 invalidate에만 의존하지 않고 paginated list cache를 직접 동기화하도록 바꿨습니다.
- update/delete mutation에는 detail/list cache optimistic 반영과 rollback 흐름을 추가했습니다.
- cache helper 테스트와 분기 커버리지 테스트를 보강해 Codecov patch coverage가 흔들리지 않도록 정리했습니다.

## 의미

- 임장 기록 워크스페이스에서 mutation 결과가 더 즉각적으로 보이게 됐습니다.
- 요청이 진행 중일 때도 상세 화면과 목록 화면이 더 일관되게 유지됩니다.
- 캐시 갱신 로직이 훅마다 흩어지지 않고 재사용 가능한 helper로 모였습니다.

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
