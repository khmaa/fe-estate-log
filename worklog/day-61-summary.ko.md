# 61일차 정리

## 작업 내용

- MSW 기반 demo 배포에서 표시되는 demo mode indicator를 추가했다.
- `VITE_ENABLE_MSW` 값을 기준으로 demo mode 여부를 판단하는 작은 app config helper를 추가했다.
- mock 데이터가 활성화되면 AppShell에 한/영 demo mode 문구가 표시되도록 변경했다.
- Vercel mock-data indicator 동작을 문서화했다.

## 주요 변경

- `apps/web/src/app/config/demoMode.ts` 추가
- `apps/web/src/app/config/demoMode.test.ts` 추가
- `apps/web/src/app/layouts/AppShell.test.tsx` 추가
- `apps/web/src/app/layouts/AppShell.tsx` 수정
- `apps/web/src/app/i18n/locales/en/common.json` 수정
- `apps/web/src/app/i18n/locales/ko/common.json` 수정
- `README.md`, `README.ko.md` 수정

## 검증

- `pnpm -F web exec vitest run src/app/config/demoMode.test.ts src/app/layouts/AppShell.test.tsx src/App.test.tsx`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
