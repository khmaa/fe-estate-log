# 37일차 작업 정리

## 작업 내용

- 언어별 하나의 `messages.json`에 모여 있던 web i18n 메시지를 도메인 단위 파일로 분리했습니다.
- 영어/한국어 각각에 `common`, `routes`, `showcase`, `visitLogs` locale 파일을 추가했습니다.
- 분리된 파일들을 i18n resource loader에서 다시 기본 `translation` namespace로 병합해 기존 번역 키 경로가 그대로 동작하도록 유지했습니다.
- 분리된 locale 파일이 기대한 키 경로로 노출되는지 검증하는 테스트를 추가했습니다.

## 의미

- `showcase`, `visitLogs`, route 문구가 계속 늘어나도 locale 파일을 더 작은 단위로 관리할 수 있게 됐습니다.
- 앱에서 사용하는 번역 키 API는 유지하면서 파일 구조만 더 깔끔하게 정리했습니다.
- 큰 locale 파일 하나에서 생길 수 있는 충돌과 유지보수 부담을 줄였습니다.

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## CI 메모

- Codecov 업로드가 한 번 실패했지만, 원인은 Codecov CLI 다운로드 중 GPG 서명 검증 실패였습니다.
- 실패 job을 재실행했을 때 통과했으므로 저장소 코드나 coverage 문제가 아니라 일시적인 외부 Codecov/CDN 문제로 판단했습니다.
