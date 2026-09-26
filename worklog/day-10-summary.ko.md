# Day 10 요약

## 개요
- 공용 상태/라벨 컴포넌트로 `Badge`를 추가했다.
- 재사용 가능한 빈 상태 UI 조합 컴포넌트로 `EmptyState`를 추가했다.
- 기존 레이아웃, 피드백, 액션 컴포넌트를 조합해서 빈 상태 패턴을 만들었다.
- shared UI 패키지가 폼 입력 중심에서 더 나아가 화면 상태 자체를 표현하는 단계로 확장됐다.

## 작업 내용

### 1. `Badge` 추가
- `libs/shared-ui/src/components/Badge.tsx` 생성
- 작고 가벼운 상태/카테고리 라벨 컴포넌트 추가
- 지원 variant:
- `default`
- `secondary`
- `success`
- `warning`
- `error`
- `Alert`, 폼 상태에서 이미 도입한 semantic color 체계를 재사용

### 2. `Badge` 스토리 추가
- `libs/shared-ui/src/components/Badge.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `Secondary`
- `Success`
- `Warning`
- `Error`

### 3. `Badge` 테스트 추가
- `libs/shared-ui/src/components/tests/Badge.test.tsx` 생성
- 검증 항목:
- children 렌더링
- error variant 스타일
- `className` 전달

### 4. `EmptyState` 추가
- `libs/shared-ui/src/components/EmptyState.tsx` 생성
- 다음과 같은 상황에 쓰는 빈 상태 UI 조합 컴포넌트 추가:
- 저장된 데이터가 없음
- 검색 결과가 없음
- 첫 진입 온보딩 비슷한 상태
- 지원 항목:
- `title`
- `description`
- 선택적 `badge`
- 선택적 `action`
- 내부적으로 다음 공용 컴포넌트를 조합해서 구성:
- `Card`
- `Badge`
- `Button`

### 5. `EmptyState` 스토리 추가
- `libs/shared-ui/src/components/EmptyState.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `WithAction`
- `FilterResultEmpty`

### 6. `EmptyState` 테스트 추가
- `libs/shared-ui/src/components/tests/EmptyState.test.tsx` 생성
- 검증 항목:
- title 렌더링
- description 렌더링
- action 렌더링
- badge 렌더링

### 7. export 갱신
- `libs/shared-ui/src/index.ts` 수정
- 추가 export:
- `Badge`
- `BadgeProps`
- `BadgeVariant`
- `EmptyState`
- `EmptyStateAction`
- `EmptyStateProps`

## 검증
- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과

## 결정 사항
- `Badge`는 별도 토큰 체계를 만들지 않고, 기존 semantic color를 재사용하는 가벼운 variant 기반 컴포넌트로 유지한다
- `EmptyState`는 저수준 primitive가 아니라, 기존 UI 조각을 조합해 만드는 composition component로 설계한다
- shared UI 레이어가 이제 폼 입력뿐 아니라 화면 상태와 작은 상태 표시 UI까지 포함하는 수준으로 확장되었다

## 다음 작업 후보
- 또 다른 inline feedback / persistent message 패턴으로 `Notice` 또는 `Banner` 추가
- `web` 프리뷰에 `Badge`, `Alert`, `Switch`, `EmptyState`까지 포함해보기
- `CheckboxField`, `RadioGroup`의 남은 분기 커버리지 보강
