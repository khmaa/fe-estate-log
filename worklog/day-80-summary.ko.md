# 80일차 요약

## 목표

임장 기록 카드 액션의 accessible name에 대상 기록 제목을 포함해, 여러 카드가 있는 목록에서도 보조 기술이 각 액션의 대상을 구분할 수 있도록 개선했습니다.

## 완료한 작업

- `VisitLogCard`의 actions 메뉴 버튼에 기록 제목이 포함된 `aria-label`을 추가했습니다.
- 상세 보기/초안 복제 dropdown menu item에 기록 제목이 포함된 accessible name을 추가했습니다.
- `Review note` 버튼에 기록 제목이 포함된 `aria-label`을 추가했습니다.
- 영어/한국어 카드 액션 label 번역을 추가했습니다.
- 카드, 목록, 화면, 앱 통합 테스트를 새 accessible name 기준으로 갱신했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogCard.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogCard.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogList.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogsScreen.test.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/src/app/i18n/locales/en/visitLogs.json`
- `apps/web/src/app/i18n/locales/ko/visitLogs.json`

## 검증

- `pnpm -F web test:run -- VisitLogCard VisitLogList VisitLogsScreen App i18n`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-card-action-labels`

## 커밋

```text
feat: Add visit log card action labels

- Include visit log titles in card action accessible names
- Add localized action labels for review, details, duplicate, and menu actions
- Update card, list, screen, and app tests for specific accessible names
- Document day 80 visit log accessibility follow-up
```
