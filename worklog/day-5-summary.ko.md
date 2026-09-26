# Day 5 요약

## 개요

- `@shared-ui/core`의 폼 컴포넌트 레이어를 계속 확장했다.
- `Label`, `Textarea`, 그리고 상위 조합 컴포넌트인 `Field`를 추가했다.
- Storybook과 `web` 앱 프리뷰에서 폼 기본 컴포넌트들이 연결되도록 정리했다.
- `pre-push`를 막고 있던 오래된 `web` 앱 테스트도 현재 UI 기준으로 수정했다.

## 작업 내용

### 1. `Label` 추가

- `libs/shared-ui/src/components/Label.tsx` 생성
- 토큰 기반 텍스트 스타일을 사용하는 시맨틱 라벨 컴포넌트 추가
- 지원 항목:
- `htmlFor`
- `className`
- children 렌더링

### 2. `Textarea` 추가

- `libs/shared-ui/src/components/Textarea.tsx` 생성
- `Input`과 동일한 토큰 기반 시각 규칙을 재사용
- 지원 항목:
- placeholder
- disabled 상태
- 사용자 지정 `className`
- 기본값 렌더링

### 3. `Field` 추가

- `libs/shared-ui/src/components/Field.tsx` 생성
- 다음 항목을 관리하는 조합 레이어 추가:
- `label`
- `helperText`
- `error`
- `required`
- `htmlFor`
- `children`
- 접근성 연결 구현:
- 자동 `id`
- `aria-describedby`
- `aria-invalid`
- `React.cloneElement`를 사용해 자식 입력 요소에 필드 상태를 전달

### 4. 스토리 추가

- `Label.stories.tsx` 생성
- `Textarea.stories.tsx` 생성
- `Field.stories.tsx` 생성
- `Input.stories.tsx`에 `WithLabel` 스토리 추가
- 다음 시각 예시를 추가:
- helper text
- error 상태
- required 표시
- textarea 필드 조합

### 5. 테스트 추가

- `Label.test.tsx` 생성
- `Textarea.test.tsx` 생성
- `Field.test.tsx` 생성
- 검증 항목:
- `htmlFor` 연결
- placeholder 렌더링
- disabled 동작
- `aria-describedby`
- `aria-invalid`
- required 표시 렌더링

### 6. 폼 상태 스타일 토큰 확장

- `styles/tokens.css` 수정
- `tailwind.preset.js` 수정
- 추가된 토큰:
- `danger`
- `danger-soft`
- `Input.tsx`와 `Textarea.tsx`가 `aria-invalid="true"`일 때 시각적으로 반응하도록 수정

### 7. 앱 프리뷰 갱신

- `apps/web/src/App.tsx` 수정
- 기존 버튼 중심 프리뷰를 폼 기초 컴포넌트 프리뷰로 교체
- 추가된 조합:
- `Label + Input`
- `Label + Textarea`
- 버튼 액션 그룹

### 8. `web` 앱 테스트 수정

- `apps/web/src/App.test.tsx` 수정
- 오래된 `Shared Button` 기대값 제거
- 현재 프리뷰 UI 기준으로 다음을 검증:
- heading
- 라벨이 연결된 필드
- 주요 액션 버튼

## 검증

- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과
- `pnpm -F web build`
- 통과
- `pnpm -F web test:run`
- 통과
- `pnpm run test:all`
- 통과

## 결정 사항

- `helperText`와 `error`는 `Input` 직접 props가 아니라 `Field` 같은 조합 컴포넌트에서 관리한다
- `Field`가 접근성 관계와 필드 수준 메시징을 담당한다
- 에러 스타일은 하드코딩 색상이 아니라 시맨틱 토큰 기반으로 처리한다

## 다음 작업 후보

- 입력값에 따라 반응하는 interactive Storybook `invalid` 예시 추가
- 다음 폼 프리미티브로 `Select` 또는 `Checkbox` 추가
- 기본 폼 세트가 안정되면 재사용 가능한 `Card` 레이아웃 컴포넌트 추가
