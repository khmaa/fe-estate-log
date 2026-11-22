# 132일차 요약

## 목표

임장 기록 상세 화면의 로딩 상태가 main 영역과 보조기술 상태 알림에 일관되게 노출되도록 개선했습니다.

## 완료한 작업

- 상세 로딩 화면의 `main`에 `aria-busy`를 적용했습니다.
- 상세 skeleton 영역을 이름이 있는 `status`로 지정했습니다.
- 기존 상세 로딩 레이블을 main과 status의 접근성 이름으로 재사용했습니다.
- 실제 상세 정보가 준비된 화면의 기존 main 레이블과 동작은 유지했습니다.
- 화면 테스트에서 busy 상태와 loading status를 함께 검증했습니다.

## 변경 파일

- `apps/web/src/features/visit-logs/components/VisitLogDetailSkeleton.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogDetailScreen.test.tsx`

## 검증

- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogDetailScreen.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.
- 제안 커밋 제목을 `commitlint`로 검증했습니다.

## 브랜치

`fix/web-detail-loading-status`

## 커밋

```text
fix: 상세 화면 로딩 상태 의미 보강

- 상세 main 영역에 busy 상태 적용
- 상세 skeleton을 이름 있는 status로 연결
- 로딩 상태 접근성 회귀 테스트 추가
- 132일차 상세 화면 접근성 작업 기록
```
