# 42일차 작업 정리

## 변경 내용
- `visit-logs` filter hook에 개별 필터 해제 helper를 추가했습니다.
- active filter badge를 임장 기록 화면에서 dismissible action으로 바꿨습니다.
- query, sort, pinned, page size, page 상태를 chip 단위로 개별 해제할 수 있게 연결했습니다.
- chip 제거 접근성 라벨용 i18n 문구를 추가했습니다.
- 개별 필터 해제에 대한 hook, screen, page, app 테스트를 보강했습니다.

## 의미
- 전체 필터를 초기화하지 않아도 특정 활성 필터 하나만 바로 제거할 수 있습니다.
- active filter summary가 읽기 전용 표시에서 실제 조작 가능한 UI로 바뀌었습니다.
- 화면에서 필터를 제거해도 URL 기반 상태와 계속 일관되게 동작합니다.

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
