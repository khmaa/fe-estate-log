# 86일차 요약

## 목표

임장 기록 목록 로딩 skeleton을 보조 기술이 현재 로딩 상태로 인식할 수 있도록 이름 있는 status 영역으로 보강했습니다.

## 완료한 작업

- `VisitLogListSkeleton`에 지역화된 `role="status"` label을 추가했습니다.
- 목록 로딩 status를 위한 영어/한국어 번역을 추가했습니다.
- 목록 로딩 테스트에서 skeleton 렌더링과 이름 있는 status 영역을 함께 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogListSkeleton.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogList.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## 검증

- `pnpm -F web test:run -- VisitLogList VisitLogsScreen App`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-list-loading-status`

## 커밋

```text
feat: Add visit log list loading status

- Expose the visit log list skeleton as a named status region
- Add localized list loading status copy
- Verify the named loading status in list tests
- Document day 86 visit log accessibility follow-up
```
