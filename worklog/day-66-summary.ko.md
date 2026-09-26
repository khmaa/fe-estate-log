# 66일차 요약

## 목표

Vercel에 저장소를 연결할 때 프로젝트 root, build command, demo mode 설정을 추측하지 않도록 실제 설정 흐름을 배포 문서에 정리했습니다.

## 완료한 작업

- 영어 배포 체크리스트에 `Create the Vercel Project` 섹션을 추가했습니다.
- 한국어 배포 체크리스트에 대응되는 `Vercel 프로젝트 생성` 섹션을 추가했습니다.
- Vercel dashboard에서 GitHub 저장소를 import하는 흐름을 문서화했습니다.
- Vercel 프로젝트 root가 `apps/web`이 아니라 저장소 루트여야 한다는 점을 명확히 했습니다.
- install command, build command, output directory, 배포 후 smoke test 요구사항을 정리했습니다.
- `build:web:demo`가 이미 `VITE_ENABLE_MSW`를 설정하므로 현재 demo 상태에서는 Vercel 환경 변수에 `VITE_ENABLE_MSW`를 따로 추가하지 않아도 된다는 점을 기록했습니다.

## 검증

- `pnpm run deploy:check`를 성공적으로 실행했습니다.
- 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, demo 웹 빌드가 모두 통과하는 것을 확인했습니다.
- 마무리 전 `git diff --check`가 통과하는 것을 확인했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
docs: Add Vercel project setup guide

- Document the repository import flow for Vercel
- Clarify root, build command, and output directory settings
- Note demo-mode environment handling before sharing the URL
```
