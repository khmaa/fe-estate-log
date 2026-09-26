# 60일차 정리

## 작업 내용

- 모노레포의 web 앱을 Vercel에 배포할 수 있도록 준비했다.
- 설치, 빌드, output routing, SPA rewrite를 위한 루트 `vercel.json`을 추가했다.
- `VITE_ENABLE_MSW=true`를 통해 demo 배포에서도 MSW mock 데이터를 사용할 수 있도록 브라우저 mock 활성화 조건을 수정했다.
- 로컬 mock 모드와 Vercel 배포 설정을 문서화했다.

## 주요 변경

- `vercel.json` 추가
- `apps/web/src/vite-env.d.ts` 추가
- `apps/web/src/mocks/index.test.ts` 추가
- `apps/web/src/mocks/index.ts` 수정
- `apps/web/.env.example` 추가 및 `.gitignore`에서 `.env.example` 추적 허용
- `README.md`, `README.ko.md`에 배포 문서 추가

## 검증

- `pnpm -F web exec vitest run src/mocks/index.test.ts`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`
