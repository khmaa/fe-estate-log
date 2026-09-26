# 62일차 정리

## 작업 내용

- web demo를 위한 Vercel 배포 체크리스트를 추가했다.
- Vercel 프로젝트 설정, demo mode 전제, 배포 전 검증, 배포 후 스모크 테스트, 문제 해결 항목을 문서화했다.
- 루트 README 파일에서 영문/한글 배포 체크리스트로 이동할 수 있도록 링크를 추가했다.

## 주요 변경

- `docs/deployment.md` 추가
- `docs/deployment.ko.md` 추가
- `README.md` 수정
- `README.ko.md` 수정

## 검증

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm -F web test:run`
