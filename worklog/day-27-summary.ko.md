# 27일차 작업 정리

- 임장 기록 상세 페이지에서 loading, not-found, 일반 요청 실패를 각각 다른 UI 상태로 구분하도록 정리했습니다.
- `VisitLogDetailSkeleton`을 추가해서 기존 spinner 중심 로딩 패널을 상세 화면 구조에 맞는 placeholder로 교체했습니다.
- typed detail fetch error를 추가하고 이를 detail hook까지 전달했으며, 관련 i18n 문구와 상세 로딩/에러 분기 테스트도 함께 보강했습니다.
