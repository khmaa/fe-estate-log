# Day 7 요약

## 개요
- `Checkbox` 전용 조합 컴포넌트인 `CheckboxField`를 추가했다.
- 첫 번째 공용 레이아웃 컨테이너인 `Card`를 추가했다.
- `web` 앱 프리뷰를 `Card` 기반 구조와 최신 폼 컴포넌트 기준으로 정리했다.
- Storybook 타입, ESLint 파서, 컴포넌트 타입 정의와 관련된 에디터 오류들도 함께 정리했다.

## 작업 내용

### 1. `CheckboxField` 추가
- `libs/shared-ui/src/components/CheckboxField.tsx` 생성
- 기존 세로형 `Field` 레이아웃을 억지로 재사용하지 않고, 체크박스 전용 필드 조합 패턴을 별도로 구성
- 지원 항목:
- `label`
- `helperText`
- `error`
- `className`
- `checkboxClassName`
- checkbox input props 전달
- 접근성 연결 구현:
- `id`
- `aria-describedby`
- `aria-invalid`

### 2. `CheckboxField` 스토리 추가
- `libs/shared-ui/src/components/CheckboxField.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `WithHelperText`
- `WithError`
- `Checked`
- `DisabledChecked`

### 3. `CheckboxField` 테스트 추가
- `libs/shared-ui/src/components/tests/CheckboxField.test.tsx` 생성
- 검증 항목:
- 라벨과 함께 checkbox 렌더링
- helper text 렌더링
- error 렌더링
- `aria-describedby`
- `aria-invalid`
- `onChange` 동작

### 4. `Card` 추가
- `libs/shared-ui/src/components/Card.tsx` 생성
- 첫 번째 공용 레이아웃 컨테이너와 관련 서브컴포넌트 추가:
- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

### 5. `Card` 스토리와 테스트 추가
- `libs/shared-ui/src/components/Card.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `Compact`
- `libs/shared-ui/src/components/tests/Card.test.tsx` 생성
- 검증 항목:
- 시맨틱 섹션 렌더링
- 카드 컨테이너의 `className` 전달

### 6. export 갱신
- `libs/shared-ui/src/index.ts` 수정
- 추가 export:
- `CheckboxField`
- `CheckboxFieldProps`
- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`
- 관련 Card prop 타입들

### 7. `web` 앱 프리뷰 갱신
- `apps/web/src/App.tsx` 수정
- 기존 레이아웃을 공용 `Card` 기반 프리뷰로 변경
- 사용한 컴포넌트:
- `Field`
- `Textarea`
- `CheckboxField`
- `Button`
- `Card` 서브컴포넌트

### 8. 에디터와 타입 오류 수정
- `CheckboxField`에서 `React.useId()`를 항상 호출하도록 바꿔 hook 규칙 오류 해결
- `CheckboxField`에서 wrapper용 `className`과 checkbox용 `checkboxClassName` 책임 분리
- Storybook 타입 import를 `@storybook/react`에서 `@storybook/react-vite`로 변경
- `Field.stories.tsx`에 필수 `args.children`을 명시해 Storybook 타입 오류 해결
- `.storybook/*.ts` 파일에도 명시적인 `tsconfigRootDir`가 적용되도록 `eslint.config.mjs` 수정

## 검증
- `pnpm run lint`
- 통과
- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과
- `pnpm -F web test:run`
- 통과
- `pnpm -F web build`
- 통과
- `pnpm exec tsc -p libs/shared-ui/tsconfig.json --noEmit`
- 통과

## 결정 사항
- Checkbox 계열 입력은 세로형 텍스트 필드 레이아웃을 재사용하지 않고 전용 조합 패턴을 둔다
- 공용 폼 컴포넌트가 어느 정도 쌓였으므로, 이제는 실제 사용 화면을 구성할 수 있는 레이아웃 컴포넌트도 함께 추가한다
- Storybook 타입은 설치된 렌더러 패키지인 `@storybook/react-vite` 기준으로 맞춘다
- 소스 외 TypeScript 설정 파일도 에디터 파서 혼선을 막기 위해 `tsconfigRootDir`를 명시한다

## 다음 작업 후보
- 기존 `aria-describedby` 병합 케이스를 추가해 `CheckboxField` 커버리지 분기 보완
- 다음 상호작용 입력 컴포넌트로 `Select`, `Radio`, `Switch` 중 하나 추가
- 기본 폼 세트가 안정되면 더 상위 레벨의 form example screen 또는 section 컴포넌트 추출 검토
