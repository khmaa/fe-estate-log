# 15일차 작업 정리

## 작업 내용

- 공용 `Button`에 loading 상태를 추가하고 새 `Spinner`와 연결했습니다.
- `web` 쇼케이스를 확장해서 loading 버튼, spinner, action menu를 실제 화면처럼 보여주도록 정리했습니다.
- Radix Popover를 기반으로 공용 `Popover` 컴포넌트를 추가하고 쇼케이스 페이지에도 반영했습니다.
- 루트 Prettier 설정, 포맷 스크립트, CI 포맷 체크를 추가했습니다.
- JSON 파싱과 기본 모듈 경계 규칙을 포함하도록 루트 ESLint 설정을 강화했습니다.
- `RadioGroup`의 helper text fallback 분기를 덮는 테스트를 추가해서 커버리지 누락을 보완했습니다.

## 핵심 변경

- `Button`은 이제 `loading`을 지원하고, loading 중에는 자동으로 비활성화되며 spinner를 렌더링합니다.
- `ShowcasePage`에는 다음 데모가 추가됐습니다.
  - loading 버튼
  - 단독 spinner
  - dropdown menu
  - popover
- `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`, `PopoverPortal`, `PopoverAnchor`를 추가했습니다.
- `.prettierrc`, `.prettierignore`, VS Code 포맷 설정을 추가했습니다.
- 루트에 `format`, `format:write`, `format:check` 스크립트를 추가했습니다.
- CI에서 포맷 규칙 위반 시 실패하도록 워크플로우를 수정했습니다.

## 검증

- `pnpm run format:write`
- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F @shared-ui/core test:run`
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/RadioGroup.test.tsx --coverage`
- `pnpm -F web test:run`
- `pnpm -F web build`

## 메모

- 포맷팅 도입으로 변경 파일이 많아졌기 때문에 커밋을 다음처럼 나누는 것이 중요해졌습니다.
  - 루트 formatting/lint/CI 설정
  - 코드베이스 전체 포맷 적용
- 앞으로는 저장소 상태 관련 질문에 답할 때 이전 문맥이 아니라 현재 git 상태를 다시 확인한 뒤 답해야 합니다.
