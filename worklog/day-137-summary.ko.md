# 137일차 요약

## 목표

문서 언어가 앱의 실제 표시 언어와 일치하도록 개선했습니다.

## 완료한 작업

- i18n 초기 언어 선택과 이후 언어 전환 시 `html[lang]`을 갱신했습니다.
- 앱 회귀 테스트에서 영어 → 한국어 → 영어 전환을 검증했습니다.
- 기존 언어 설정 저장 방식과 번역 리소스를 유지했습니다.

## 변경 파일

- `apps/web/src/app/i18n.ts`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F web exec vitest run src/app/i18n.test.ts src/app/layouts/AppShell.test.tsx src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## 브랜치

`fix/web-document-language`

## 커밋

```text
fix: 문서 언어를 앱 언어와 동기화

- i18n 초기화와 언어 전환 시 HTML lang 반영
- 영어와 한국어 전환 회귀 테스트 보강
- 137일차 한영 작업 기록 추가
```
