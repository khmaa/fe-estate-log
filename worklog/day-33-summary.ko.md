# 33일차 작업 정리

## 작업 내용

- 임장 기록 목록에서 상세 query prefetch를 추가했습니다.
- 임장 기록 상세 query key와 options를 공용 helper로 재사용하도록 정리했습니다.
- 카드 hover/focus 시 상세 캐시를 미리 채우도록 연결했습니다.

## 의미

- 목록에서 상세 라우트로 들어갈 때 더 따뜻한 캐시 경로를 사용할 수 있게 됐습니다.
- lazy-loaded detail route 구조를 바꾸지 않으면서도 체감 전환 속도를 개선하는 방향입니다.
- prefetch 로직을 UI에 중복하지 않고 기존 query 레이어와 같은 기준으로 유지했습니다.

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
