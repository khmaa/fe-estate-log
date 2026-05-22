# 배포 체크리스트

이 프로젝트는 백엔드 서버 없이도 Vercel demo로 배포할 수 있습니다.
현재 production demo는 아직 mock 임장 기록 데이터를 사용하므로 MSW 브라우저 handler로 동작합니다.

## Vercel 프로젝트 설정

Vercel 프로젝트 root는 저장소 루트로 설정합니다.
루트 `vercel.json`에는 다음 배포 설정이 정의되어 있습니다.

- install command: `pnpm install --frozen-lockfile`
- build command: `pnpm run build:web:demo`
- output directory: `apps/web/dist`
- SPA rewrite: `/(.*)` -> `/index.html`

실제 백엔드가 없는 demo 상태에서는 `build:web:demo`가 `VITE_ENABLE_MSW=true`로 빌드되도록 유지합니다.
배포된 API와 연결한 뒤에만 이 flag를 제거합니다.

## Demo URL

첫 배포가 스모크 테스트를 통과한 뒤 검증된 production demo URL을 루트 README의 `Live Demo` 섹션에 기록합니다.
production에서 demo mode indicator, mock 데이터, 직접 route 접근이 동작하는 것을 확인하기 전에는 배포 URL을 추가하지 않습니다.

## 배포 전 확인

배포 PR을 올리기 전에 다음 명령을 실행합니다.

```bash
pnpm run deploy:check
```

이 스크립트는 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, Vercel에서 사용하는 demo 웹 빌드를 순서대로 실행합니다.

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
- 스모크 테스트 통과 후 루트 README의 `Live Demo` 섹션이 검증된 배포 URL을 가리킨다.

## 문제 해결

- 배포된 목록 로딩이 실패하면 `build:web:demo`가 여전히 `VITE_ENABLE_MSW=true`로 빌드되는지 확인한다.
- 상세 URL 직접 접근이 실패하면 `vercel.json`의 `rewrites` 규칙이 배포되었는지 확인한다.
- demo indicator가 보이지 않으면 배포 bundle이 `VITE_ENABLE_MSW=true`로 빌드되었는지 확인한다.
- 추후 실제 백엔드를 추가하면 `VITE_ENABLE_MSW=true`를 제거하고 mock handler를 배포 API 설정으로 교체한다.
