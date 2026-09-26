# 21일차 작업 정리

## 작업 내용
- `visit-logs` 상세 흐름을 목록 내부 모달에서 라우트 기반 상세 페이지로 옮겼다.
- `/visit-logs/:visitLogId`를 위한 전용 상세 페이지, 상세 화면 컴포넌트, 상세 hook을 추가했다.
- 목록 필터는 URL query string에 그대로 두고, 상세 진입/복귀 시 현재 search param을 유지하도록 정리했다.
- 앱 테스트와 feature 테스트를 새 라우트 기반 상세 흐름에 맞게 갱신했다.
- 테스트의 nullable query assertion 패턴을 정리하고, `VisitLogDetailScreen`의 loading 분기까지 덮어서 `codecov/patch` 누락이 생기지 않도록 보강했다.

## 주요 변경
- `apps/web/src/pages/VisitLogDetailPage.tsx` 추가
- `apps/web/src/features/visit-logs/components/VisitLogDetailScreen.tsx` 추가
- `apps/web/src/features/visit-logs/hooks/useVisitLogDetail.ts` 추가
- `AppRoutes.tsx`에 `/visit-logs/:visitLogId` 라우트 추가
- `VisitLogsPage.tsx`, `VisitLogsScreen.tsx`, `VisitLogCard.tsx`, `VisitLogList.tsx`를 상세 모달 대신 상세 라우트 이동 구조로 변경
- 라우트/상세 테스트를 추가하고, app/shared-ui 테스트 파일의 nullable query assertion 패턴 정리

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run test:all`
- `pnpm -F web build`

## 메모
- 첫 구현에서는 `VisitLogsScreen`에 잘못 남아 있던 handler 참조와 `App.test.tsx`의 예전 상세 모달 기대값 때문에 테스트가 깨졌다.
- 카드 선택을 제목 기준으로 안정화하고, 상세 라우트 전환 테스트를 다시 맞췄으며, `VisitLogDetailScreen`의 loading 테스트까지 추가해 이번 변경이 `codecov/patch` 기준에서도 닫히도록 정리했다.
