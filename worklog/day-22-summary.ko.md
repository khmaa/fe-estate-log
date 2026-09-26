# 22일차 작업 정리

## 작업 내용
- `apps/web`에 `i18next`와 `react-i18next`를 도입하고 앱 레벨에서 i18n을 초기화했다.
- 앱 셸에 언어 전환 버튼을 추가하고, 선택한 언어가 유지되도록 저장 로직을 붙였다.
- 번역 리소스를 코드 내부 객체 대신 언어별 JSON 파일 구조로 옮겼다.
- `visit-logs` feature 전반에 i18n 적용 범위를 넓혀 필터, 목록 상태, 카드, 상세 라벨, 생성/수정/삭제 다이얼로그까지 번역되도록 정리했다.
- 한국어 전환이 실제 다이얼로그 렌더링에도 반영되는지 앱 테스트까지 보강했다.

## 주요 변경
- `apps/web/src/app/i18n.ts`, `apps/web/src/app/i18n/resources.ts` 추가
- 언어별 메시지 파일 추가
  - `apps/web/src/app/i18n/locales/en/messages.json`
  - `apps/web/src/app/i18n/locales/ko/messages.json`
- `apps/web/src/main.tsx`에서 i18n 초기화 연결
- `apps/web/src/App.tsx`에 언어 전환 UI와 앱 셸 문구 번역 적용
- 다음 `visit-logs` 컴포넌트에 i18n 적용
  - `VisitLogFilters.tsx`
  - `VisitLogsScreen.tsx`
  - `VisitLogList.tsx`
  - `VisitLogCard.tsx`
  - `VisitLogDetailScreen.tsx`
  - `VisitLogCreateDialog.tsx`
  - `VisitLogEditDialog.tsx`
  - `VisitLogDeleteDialog.tsx`
- 상태/매물유형 라벨을 공통으로 처리하는 `apps/web/src/features/visit-logs/utils/visitLogLabels.ts` 추가
- 앱 테스트와 컴포넌트 테스트를 현재 번역 문구 기준으로 갱신

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## 메모
- 첫 i18n 적용은 앱 셸과 일부 페이지 문자열만 포함해서, 생성 다이얼로그와 카드 액션 문구가 그대로 남아 있었다.
- 이후 `visit-logs` 전체 문구를 옮기는 과정에서 locale key 누락과 `visitLogLabels` 유틸 파일 누락이 같이 드러났고, 테스트와 빌드가 한 번 깨졌다.
- 누락된 키와 유틸을 복구하고, 한국어 전환 후 생성 다이얼로그까지 실제로 확인하는 테스트를 추가한 뒤 web 기준 전체 검증을 다시 통과시켰다.
