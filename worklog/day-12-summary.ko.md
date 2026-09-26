# 12일차 작업 정리

## 개요

- Radix Dialog 기반으로 공용 `Dialog` 컴포넌트 세트를 shared-ui에 추가했습니다.
- 모달 API를 헤더, 바디, 푸터, 트리거, 닫기 액션으로 나눈 구조로 정리했습니다.
- push 전에 `apps/web`에서 `vitest`를 못 찾던 로컬 워크스페이스 설치 상태도 함께 복구했습니다.

## 완료한 작업

- `libs/shared-ui`에 `@radix-ui/react-dialog` 의존성을 추가했습니다.
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose`를 구현했습니다.
- 기본 모달 흐름과 확인형 모달 흐름을 위한 Storybook 스토리를 추가했습니다.
- 열기, 닫기, `className` 병합 동작을 검증하는 테스트를 추가했습니다.
- shared-ui 엔트리 포인트에서 Dialog 관련 컴포넌트를 export 하도록 반영했습니다.
- `apps/web`에서 깨져 있던 `vitest` 해석 문제를 해결하기 위해 워크스페이스 install을 다시 실행했습니다.

## 검증

- `pnpm run lint`
- `pnpm -F @shared-ui/core test:run`
- `pnpm -F @shared-ui/core storybook:build`
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Dialog.test.tsx`
- `pnpm -F web test:run`

## 메모

- Storybook build 시 Radix의 `use client` 관련 Vite 경고는 보였지만, 빌드는 정상 완료됐습니다.
- push를 막던 원인은 package.json 설정 문제가 아니라 로컬 워크스페이스 `node_modules` 링크 상태였습니다.

## 다음 작업 후보

- 다음 포털 기반 피드백 컴포넌트로 `Toast` 추가
- `web` showcase 페이지에 Dialog 예시 배치
- 지금까지 만든 shared-ui 컴포넌트를 섹션별로 정리한 showcase 확장
