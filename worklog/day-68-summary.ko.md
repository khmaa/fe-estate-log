# 68일차 요약

## 목표

Vercel 스모크 테스트가 성공한 뒤 실제 demo URL을 README에 반영하는 최종 흐름을 배포 문서에 정리했습니다.

## 완료한 작업

- 영어 배포 체크리스트에 스모크 테스트 통과 후 README 수정 순서를 추가했습니다.
- 한국어 배포 체크리스트에도 같은 흐름을 추가했습니다.
- `README.md`와 `README.ko.md`를 같은 PR에서 함께 수정해야 한다는 점을 문서화했습니다.
- 이후 배포 검증 흐름을 찾을 수 있도록 demo URL 근처에 배포 체크리스트 링크를 유지해야 한다는 점을 명시했습니다.
- 스모크 테스트가 실패하면 README placeholder를 유지하고 배포 문제를 먼저 해결해야 한다는 점을 명확히 했습니다.

## 검증

- `pnpm run deploy:check`를 성공적으로 실행했습니다.
- 포맷 검사, 린트, 워크스페이스 테스트, 일반 웹 빌드, demo 웹 빌드가 모두 통과하는 것을 확인했습니다.
- 마무리 전 `git diff --check`가 통과하는 것을 확인했습니다.
- 마무리 시점에 워크트리가 깨끗한 것을 확인했습니다.

## 커밋

```text
docs: Document demo URL update flow

- Add the post-smoke-test README update sequence
- Keep English and Korean deployment docs aligned
- Clarify that failed smoke tests should not update the README placeholder
```
