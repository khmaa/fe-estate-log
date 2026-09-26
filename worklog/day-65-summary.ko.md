# 65일차 요약

## 목표

배포 관련 PR을 올리기 전에 로컬에서 같은 검증 흐름을 한 번에 실행할 수 있도록 배포 전 검증 명령을 추가했습니다.

## 완료한 작업

- 루트에 `deploy:check` 스크립트를 추가했습니다.
- 해당 스크립트가 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, Vercel demo 빌드를 한 번에 실행하도록 구성했습니다.
- 영어 배포 체크리스트가 `pnpm run deploy:check`를 사용하도록 수정했습니다.
- 한국어 배포 체크리스트도 같은 공통 명령을 사용하도록 수정했습니다.

## 검증

- `pnpm run deploy:check`를 성공적으로 실행했습니다.
- 포맷 검사, 린트, 테스트, 일반 웹 빌드, demo 웹 빌드가 모두 완료되는 것을 확인했습니다.
- 마무리 전 `git diff --check`가 통과하는 것을 확인했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
chore: Add deployment check script

- Add a root deploy check command for release verification
- Run format, lint, tests, normal build, and demo build together
- Update deployment docs to use the shared check command
```
