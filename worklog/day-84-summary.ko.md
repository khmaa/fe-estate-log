# 84일차 요약

## 목표

임장 기록 상세 화면의 정상/빈 상태/오류 상태 main landmark가 각각 현재 화면 제목으로 식별되도록 보강했습니다.

## 완료한 작업

- 정상 상세 화면의 `main` landmark를 방문 기록 제목과 `aria-labelledby`로 연결했습니다.
- 상세 카드 제목에 안정적인 id를 추가했습니다.
- 상세 empty state와 request error state의 `main` landmark에 상태 제목 기반 `aria-label`을 추가했습니다.
- 상세 화면 테스트에서 정상/빈 상태/오류 상태의 이름 있는 `main` landmark를 검증했습니다.
- App 테스트에서 직접 상세 라우트와 누락된 상세 라우트의 `main` landmark를 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogDetailScreen.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailScreen.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F web test:run -- VisitLogDetailScreen App`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/web-visit-log-detail-main-landmark`

## 커밋

```text
feat: Add visit log detail main landmark labels

- Link the visit log detail main landmark to the record title
- Label detail empty and error main landmarks by their state titles
- Verify named detail main regions in screen and app tests
- Document day 84 visit log accessibility follow-up
```
