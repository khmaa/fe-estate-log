# 117일차 요약

## 목표

Showcase의 백그라운드 동기화 Spinner가 현재 언어의 진행 상태를 보조기술에도 정확히 전달하도록 개선했습니다.

## 완료한 작업

- 백그라운드 동기화 Spinner의 accessible label에 기존 번역 문구를 연결했습니다.
- 영문 환경에서 generic `Loading` 대신 실제 동기화 상태가 status 이름으로 노출되도록 했습니다.
- 한글 전환 후에도 번역된 동기화 상태가 accessible name으로 반영되도록 했습니다.
- 화면에 함께 표시되는 동일 문구는 `aria-hidden`으로 처리해 보조기술의 중복 낭독을 방지했습니다.
- 앱 통합 테스트에서 영문과 한글 status 이름을 각각 검증했습니다.

## 변경 파일

- `apps/web/src/pages/ShowcasePage.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/web-showcase-spinner-accessibility`

## 커밋

```text
fix: 쇼케이스 Spinner 접근성 이름 현지화

- 백그라운드 동기화 번역을 Spinner status 이름으로 연결
- 영문과 한글 환경의 접근성 상태 이름 검증
- 화면 문구의 보조기술 중복 낭독 방지
- Showcase 앱 흐름과 프로덕션 빌드 회귀 검증
- 117일차 Spinner 접근성 작업 기록
```
