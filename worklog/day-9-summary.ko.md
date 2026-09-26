# Day 9 요약

## 개요
- 첫 번째 공용 피드백 메시지 컴포넌트로 `Alert`를 추가했다.
- 설정 on/off 용 boolean 입력 컴포넌트로 `Switch`를 추가했다.
- 피드백 상태를 더 표현할 수 있도록 semantic color token 체계를 확장했다.
- 폼, 레이아웃, 피드백 UI가 균형 있게 갖춰지도록 shared UI 레이어를 계속 확장했다.

## 작업 내용

### 1. `Alert` 추가
- `libs/shared-ui/src/components/Alert.tsx` 생성
- 다음 컴포넌트 추가:
- `Alert`
- `AlertTitle`
- `AlertDescription`
- 지원 variant:
- `info`
- `success`
- `warning`
- `error`
- `role="alert"` 기반 피드백 컨테이너 구현

### 2. `Alert` 스토리 추가
- `libs/shared-ui/src/components/Alert.stories.tsx` 생성
- 추가한 스토리:
- `Info`
- `Success`
- `Warning`
- `Error`

### 3. `Alert` 테스트 추가
- `libs/shared-ui/src/components/tests/Alert.test.tsx` 생성
- 검증 항목:
- title 렌더링
- description 렌더링
- error variant 스타일
- `className` 전달

### 4. semantic feedback token 확장
- `styles/tokens.css` 수정
- `tailwind.preset.js` 수정
- 추가한 semantic color pair:
- `info`
- `info-soft`
- `success`
- `success-soft`
- `warning`
- `warning-soft`
- 에러 상태는 기존 `danger` token pair 재사용

### 5. `Switch` 추가
- `libs/shared-ui/src/components/Switch.tsx` 생성
- 설정형 토글 UI 구현
- 내부적으로 checkbox input과 `peer` 기반 track/thumb 패턴 사용
- 지원 항목:
- checked 상태
- disabled 상태
- `onChange`
- `className`

### 6. `Switch` 스토리 추가
- `libs/shared-ui/src/components/Switch.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `Checked`
- `Disabled`
- `DisabledChecked`
- `WithLabel`

### 7. `Switch` 테스트 추가
- `libs/shared-ui/src/components/tests/Switch.test.tsx` 생성
- 검증 항목:
- checkbox 렌더링
- checked 상태
- disabled 상태
- `onChange` 동작

### 8. export 갱신
- `libs/shared-ui/src/index.ts` 수정
- 추가 export:
- `Alert`
- `AlertTitle`
- `AlertDescription`
- `AlertProps`
- `AlertTitleProps`
- `AlertDescriptionProps`
- `AlertVariant`
- `Switch`
- `SwitchProps`

## 검증
- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과

## 결정 사항
- 피드백 UI는 raw color 값 대신 semantic token을 사용한다
- `Alert`는 portal 기반이 아니라 페이지 흐름 안에서 쓰는 inline feedback 컴포넌트로 유지한다
- `Switch`는 액션성 toggle button과 구분되는 설정 on/off 상태 표현용 컴포넌트로 본다

## 다음 작업 후보
- 가벼운 상태/라벨 컴포넌트로 `Badge` 추가
- 또 다른 피드백 계열 컴포넌트로 `EmptyState` 또는 `Notice` 추가
- `web` 프리뷰에 `Alert`와 `Switch`까지 포함해보기
- `CheckboxField`, `RadioGroup`의 남은 분기 커버리지 보강
