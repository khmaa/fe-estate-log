# 63일차 정리

## 작업 내용
- 루트 README 파일에 Live Demo 섹션을 추가했다.
- 첫 Vercel 배포 검증이 끝난 뒤에만 공개 demo URL을 추가하도록 문서화했다.
- 검증된 demo URL을 어디에 기록할지 배포 체크리스트에 추가했다.
- 배포 후 스모크 테스트에 README demo link 확인 항목을 추가했다.

## 주요 변경
- `README.md` 수정
- `README.ko.md` 수정
- `docs/deployment.md` 수정
- `docs/deployment.ko.md` 수정

## 검증
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web build`
- `VITE_ENABLE_MSW=true pnpm -F web build`
- `pnpm -F web test:run`
