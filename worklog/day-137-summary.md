# Day 137 Summary

## Goal

Kept the document language in sync with the app's display language.

## Completed Work

- Updated `html[lang]` on initial language selection and subsequent changes.
- Verified the English to Korean to English transition in the app regression test.
- Preserved language preference persistence and translation resources.

## Changed Files

- `apps/web/src/app/i18n.ts`
- `apps/web/src/App.test.tsx`

## Verification

- `pnpm -F web exec vitest run src/app/i18n.test.ts src/app/layouts/AppShell.test.tsx src/App.test.tsx --coverage.enabled=false`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm run build:web`
- `git diff --check`
- `pnpm exec commitlint`

## Branch

`fix/web-document-language`

## Commit

```text
fix: 문서 언어를 앱 언어와 동기화

- i18n 초기화와 언어 전환 시 HTML lang 반영
- 영어와 한국어 전환 회귀 테스트 보강
- 137일차 한영 작업 기록 추가
```
