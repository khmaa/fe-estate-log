# 11일차 작업 정리

## 개요

- 페이지 상단이나 섹션 안에서 지속적으로 보여줄 수 있는 공용 `Banner` 컴포넌트를 추가했습니다.
- `App.tsx`를 얇은 엔트리로 유지하기 위해 현재 웹 프리뷰를 별도의 `ShowcasePage`로 분리했습니다.
- 변경 후 lint, 테스트, 프로덕션 빌드까지 다시 확인했습니다.

## 완료한 작업

- `libs/shared-ui`에 `Banner`, `Banner.stories.tsx`, `Banner.test.tsx`를 추가했습니다.
- `shared-ui` 엔트리 포인트에서 `Banner`를 export 하도록 반영했습니다.
- `info`, `success`, `warning` variant와 선택적 action slot을 지원하도록 구현했습니다.
- `apps/web/src/App.tsx`에 있던 shared UI 프리뷰 마크업을 `apps/web/src/pages/ShowcasePage.tsx`로 이동했습니다.
- `App.tsx`는 이제 `ShowcasePage`만 렌더하도록 정리했습니다.

## 검증

- `pnpm -F @shared-ui/core test:run`
- `pnpm -F @shared-ui/core storybook:build`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## 의미

- `Banner`는 인라인 `Alert`와 전체 `EmptyState` 사이를 메우는 장기 노출 안내 UI 역할을 합니다.
- `ShowcasePage` 분리로 앱 엔트리 구조가 단순해졌고, 이후 라우팅이나 실제 서비스 페이지를 붙이기 쉬워졌습니다.

## 다음 작업 후보

- `ShowcasePage`를 섹션형 shared UI 데모 페이지로 확장하기
- 실제 서비스 화면을 위한 `web` 페이지 구조 초안 잡기
- `CheckboxField`, `RadioGroup` 같은 컴포넌트의 남은 branch coverage 정리하기
