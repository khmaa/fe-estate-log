# 67일차 요약

## 목표

배포 후 스모크 테스트를 실제로 실행하고 기록하기 쉽게 재사용 가능한 체크리스트 템플릿으로 정리했습니다.

## 완료한 작업

- 영어 배포 문서의 배포 후 스모크 테스트 섹션을 복사 가능한 체크리스트로 변경했습니다.
- 한국어 배포 문서의 배포 후 스모크 테스트 섹션도 같은 체크리스트 형식으로 변경했습니다.
- 스모크 테스트 대상 URL, 검증자, 검증 일시를 적을 수 있는 메타 항목을 추가했습니다.
- 기존 기능 검증 범위는 유지하면서 PR이나 release note에 붙여 넣기 쉬운 형태로 정리했습니다.

## 검증

- `pnpm run deploy:check`를 성공적으로 실행했습니다.
- 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, demo 웹 빌드가 모두 통과하는 것을 확인했습니다.
- 마무리 전 `git diff --check`가 통과하는 것을 확인했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
docs: Add deployment smoke test checklist

- Convert post-deployment smoke tests into a reusable checklist
- Add target URL, verifier, and verification time fields
- Keep English and Korean deployment docs aligned
```
