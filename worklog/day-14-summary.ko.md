# 14일차 작업 정리

## 개요

- `ShowcasePage`를 실제 shared UI 데모 페이지처럼 섹션형 구조로 확장했습니다.
- `ToastHostProvider`와 `useToast()`를 추가해서 toast를 더 쉽게 사용할 수 있는 helper API를 만들었습니다.
- 이전 PR의 Codecov patch coverage 문제를 테스트 보강으로 해결했습니다.
- `DropdownMenu`와 `Spinner`를 새로운 공용 UI primitive로 추가했습니다.

## 완료한 작업

- `apps/web/src/pages/ShowcasePage.tsx`를 폼, 선택 컨트롤, 피드백, 오버레이, 빈 상태 섹션으로 재구성했습니다.
- `ToastHostProvider`, `useToast`, 관련 스토리와 테스트를 추가해서 toast 사용 흐름을 단순화했습니다.
- `ToastHost`, `useToast`, 웹 showcase 상호작용을 덮는 테스트를 추가해 patch coverage 기준을 맞췄습니다.
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuPortal`을 추가했습니다.
- `Spinner`를 size variant와 접근성 label을 포함한 공용 로딩 indicator로 추가했습니다.
- 새 컴포넌트들을 shared-ui 엔트리 포인트에서 export 하도록 반영했습니다.

## 검증

- `pnpm run lint`
- `pnpm -F @shared-ui/core test:run`
- `pnpm -F @shared-ui/core storybook:build`
- `pnpm -F web test:run`
- `pnpm -F web build`

## 메모

- `DropdownMenu`, `Dialog`, `Toast`는 접근성과 상호작용 안정성을 위해 Radix primitive 위에 스타일 wrapper를 올리는 방식으로 유지했습니다.
- 프로젝트 원칙도 정리했습니다: 관심사는 분리하되, 단순한 컴포넌트까지 과도하게 추상화하지는 않습니다.
- 현재 남아 있는 낮은 branch coverage는 오늘 작업 범위가 아니라 기존 `CheckboxField`, `RadioGroup` 쪽입니다.

## 다음 작업 후보

- 새 `Spinner`를 활용한 `Button` loading 상태 추가
- `DropdownMenu`와 `Spinner`를 web showcase에 직접 배치
- 고급 메뉴 기능이나 버튼/토스트 확장 API를 위한 다음 리파인 단계 시작
