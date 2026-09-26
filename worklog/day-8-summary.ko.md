# Day 8 요약

## 개요
- 공용 단일 선택 입력 컴포넌트로 `RadioGroup`을 추가했다.
- 공용 드롭다운 선택 컴포넌트로 `Select`를 추가했다.
- 새 스토리들에서 발생한 Storybook hook 사용 방식과 타입 오류를 함께 정리했다.
- `@shared-ui/core` 안의 재사용 가능한 폼 기본 세트를 계속 확장했다.

## 작업 내용

### 1. `RadioGroup` 추가
- `libs/shared-ui/src/components/RadioGroup.tsx` 생성
- 독립된 `Radio`를 먼저 노출하기보다 그룹 중심 선택 컴포넌트로 설계
- 지원 항목:
- 그룹 label
- helper text
- error text
- disabled 옵션
- `value` 기반 제어형 선택
- `onValueChange` 기반 변경 처리
- 접근성 연결 구현:
- `radiogroup`
- `aria-describedby`
- `aria-invalid`
- 옵션 설명 문구

### 2. `RadioGroup` 스토리 추가
- `libs/shared-ui/src/components/RadioGroup.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `WithError`
- `WithDisabledOption`

### 3. `RadioGroup` 테스트 추가
- `libs/shared-ui/src/components/tests/RadioGroup.test.tsx` 생성
- 검증 항목:
- 그룹 label 렌더링
- radio 옵션 렌더링
- helper text 연결
- error 상태 연결
- `onValueChange` 동작

### 4. `RadioGroup` 스토리의 hook 사용 방식 수정
- 처음에는 Storybook `render` 함수 안에서 직접 `useState`를 호출했음
- 상태 처리를 별도 wrapper 컴포넌트로 분리:
- `RadioGroupStory`
- 이를 통해 Storybook 스토리의 React hooks lint 오류 해결

### 5. `Select` 추가
- `libs/shared-ui/src/components/Select.tsx` 생성
- 네이티브 `select`를 감싼 토큰 기반 드롭다운 컴포넌트 추가
- 지원 항목:
- `disabled`
- `className`
- `aria-invalid`
- option children 렌더링

### 6. `Select` 스토리 추가
- `libs/shared-ui/src/components/Select.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `WithValue`
- `Disabled`
- `WithError`

### 7. `Select` 테스트 추가
- `libs/shared-ui/src/components/tests/Select.test.tsx` 생성
- 검증 항목:
- option 렌더링
- 선택된 값
- disabled 상태
- `onChange` 동작

### 8. export 갱신
- `libs/shared-ui/src/index.ts` 수정
- 추가 export:
- `RadioGroup`
- `RadioGroupProps`
- `RadioOption`
- `Select`
- `SelectProps`

## 검증
- `pnpm run lint`
- 통과
- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/RadioGroup.test.tsx --coverage`
- 통과

## 결정 사항
- 지금 단계에서는 독립된 `Radio`보다 그룹 단위 추상화인 `RadioGroup`이 더 적절하다
- 로컬 상태가 필요한 Storybook 스토리는 `render` 안에서 hook을 직접 호출하지 않고, 별도 wrapper 컴포넌트를 사용한다
- `Select`는 먼저 네이티브 드롭다운 래퍼로 시작하고, 이후 필요할 때 커스텀 선택 UI를 고려한다

## 다음 작업 후보
- 다음 불리언/토글 입력으로 `Switch` 추가
- `Select`, `RadioGroup`, 기존 필드 컴포넌트를 묶은 상위 예제 form section 추가
- `RadioGroup`, `CheckboxField`의 분기 커버리지 보강
