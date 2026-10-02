# 83일차 요약

## 목표

임장 기록 워크스페이스의 메인 영역이 페이지 제목과 연결되도록 보강해, 보조 기술이 현재 화면의 주요 landmark를 더 명확히 탐색할 수 있게 했습니다.

## 완료한 작업

- `VisitLogsScreen`의 `main` landmark에 `aria-labelledby`를 추가했습니다.
- 임장 기록 워크스페이스 제목에 안정적인 id를 연결했습니다.
- screen 테스트에서 이름 있는 `main` landmark를 검증했습니다.
- App 테스트에서 영어/한국어 전환 후에도 `main` landmark 이름이 유지되는지 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogsScreen.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogsScreen.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogsScreen App`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-main-landmark`

## 커밋

```text
feat: Add visit log main landmark label

- Link the visit logs main landmark to the workspace heading
- Verify the named main region in screen and app tests
- Cover localized main landmark naming after language switching
- Document day 83 visit log accessibility follow-up
```
