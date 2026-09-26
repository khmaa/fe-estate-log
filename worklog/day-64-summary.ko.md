# 64일차 요약

## 목표

Vercel 배포, 로컬 검증, 문서에서 사용하는 demo build 명령을 하나의 루트 스크립트로 통일했습니다.

## 완료한 작업

- 루트에 `VITE_ENABLE_MSW=true`로 웹 앱을 빌드하는 `build:web:demo` 스크립트를 추가했습니다.
- `vercel.json`의 Vercel build command가 `pnpm run build:web:demo`를 사용하도록 변경했습니다.
- 영어/한국어 README의 배포 설명에서 공통 demo build 스크립트를 참조하도록 수정했습니다.
- 영어/한국어 배포 체크리스트의 배포 전 검증 명령과 문제 해결 문구를 공통 demo build 스크립트 기준으로 정리했습니다.

## 검증

- 64일차 시작 전 63일차 live demo 문서 작업이 `main`에 병합된 것을 확인했습니다.
- 변경 후 포맷, 린트, 일반 웹 빌드, demo 웹 빌드, whitespace 검사를 실행했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
chore: Align Vercel demo build command

- Add a shared root demo build script
- Point Vercel deployment to the shared script
- Update deployment docs to use the same command
```
