# 배포 체크리스트

이 프로젝트는 백엔드 서버 없이도 Vercel demo로 배포할 수 있습니다.
현재 production demo는 아직 mock 임장 기록 데이터를 사용하므로 MSW 브라우저 handler로 동작합니다.

## Vercel 프로젝트 설정

Vercel 프로젝트 root는 저장소 루트로 설정합니다.
루트 `vercel.json`에는 다음 배포 설정이 정의되어 있습니다.

- install command: `pnpm install --frozen-lockfile`
- build command: `VITE_ENABLE_MSW=true pnpm -F web build`
- output directory: `apps/web/dist`
- SPA rewrite: `/(.*)` -> `/index.html`

실제 백엔드가 없는 demo 상태에서는 `VITE_ENABLE_MSW=true`를 유지합니다.
배포된 API와 연결한 뒤에만 이 값을 제거합니다.

## 배포 전 확인

배포 PR을 올리기 전에 다음 명령을 실행합니다.

```bash
pnpm run format:check
pnpm run lint
pnpm -F web test:run
pnpm -F web build
VITE_ENABLE_MSW=true pnpm -F web build
```

## 배포 후 스모크 테스트

Vercel 배포가 끝나면 배포 URL을 브라우저에서 확인합니다.

- `/`로 접속하면 `/visit-logs`로 이동한다.
- App shell에 `데모 모드`와 `Mock 데이터`가 표시된다.
- 백엔드 서버 없이 임장 기록 목록 데이터가 표시된다.
- 언어 전환으로 App shell과 페이지 문구가 영어/한국어로 바뀐다.
- 임장 기록 검색, 정렬, 고정 필터, 활성 필터 제거, 페이지네이션이 동작한다.
- 임장 기록 생성 후 success toast가 표시되고 mock 목록에 draft가 추가된다.
- 목록에서 임장 기록 상세 route로 이동할 수 있다.
- `/visit-logs/:visitLogId`에 직접 접속하거나 새로고침해도 상세 화면이 열린다.
- 임장 기록 수정 후 update toast가 표시되고 상세 화면이 동기화된다.
- 임장 기록 삭제 후 delete toast가 표시되고 목록으로 돌아간다.
- 존재하지 않는 route에 직접 접속해도 Vercel 404가 아니라 앱의 not found page가 표시된다.

## 문제 해결

- 배포된 목록 로딩이 실패하면 Vercel build command에 `VITE_ENABLE_MSW=true`가 포함되어 있는지 확인한다.
- 상세 URL 직접 접근이 실패하면 `vercel.json`의 `rewrites` 규칙이 배포되었는지 확인한다.
- demo indicator가 보이지 않으면 배포 bundle이 `VITE_ENABLE_MSW=true`로 빌드되었는지 확인한다.
- 추후 실제 백엔드를 추가하면 `VITE_ENABLE_MSW=true`를 제거하고 mock handler를 배포 API 설정으로 교체한다.
