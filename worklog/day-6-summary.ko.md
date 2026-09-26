# Day 6 요약

## 개요
- `Checkbox`를 첫 번째 공용 선택형 입력 컴포넌트로 추가했다.
- 체크박스 상태 조합에 대한 Storybook과 테스트 범위를 확장했다.
- 저장소 커버리지 노출을 위해 GitHub Actions와 Codecov 연동을 설정했다.
- 누락된 React 타입 패키지와 `lcov` 출력 부재로 인해 발생하던 CI 실패도 함께 정리했다.

## 작업 내용

### 1. `Checkbox` 추가
- `libs/shared-ui/src/components/Checkbox.tsx` 생성
- 토큰 기반 스타일을 사용하는 공용 체크박스 래퍼 구현
- 지원 항목:
- checked 상태
- disabled 상태
- `className`
- `onChange`

### 2. `Checkbox` 스토리 추가
- `libs/shared-ui/src/components/Checkbox.stories.tsx` 생성
- 추가한 스토리:
- `Default`
- `Checked`
- `Disabled`
- `DisabledChecked`
- `WithLabel`

### 3. `Checkbox` 테스트 추가
- `libs/shared-ui/src/components/tests/Checkbox.test.tsx` 생성
- 검증 항목:
- checkbox 렌더링
- checked 상태
- disabled 상태
- disabled + checked 상태
- `onChange` 동작

### 4. `Field` 테스트 커버리지 보강
- `libs/shared-ui/src/components/tests/Field.test.tsx` 수정
- 기존 `aria-describedby` 값을 병합하는 케이스 추가
- `Field.tsx` 커버리지를 100%로 맞춤

### 5. CI 및 Codecov 설정 추가
- `.github/workflows/ci.yml` 생성
- 다음 단계가 포함된 CI workflow 추가:
- 의존성 설치
- lint
- test
- web build
- Codecov 커버리지 업로드
- `README.md`, `README.ko.md` 수정
- coverage badge 추가
- Codecov 기반 저장소 커버리지 표시 방식 문서화

### 6. CI 타입 의존성 실패 수정
- `@shared-ui/core`에 누락된 타입 패키지 추가
- 추가한 패키지:
- `@types/react`
- `@types/react-dom`
- `web` 빌드 시 발생하던 React 타입 선언 누락 오류 해결

### 7. Codecov 업로드 실패 수정
- 다음 파일 수정:
- `apps/web/vitest.config.ts`
- `libs/shared-ui/vitest.config.ts`
- coverage reporter에 `lcov` 추가
- 다음 파일이 실제 생성되는 것 확인:
- `apps/web/coverage/lcov.info`
- `libs/shared-ui/coverage/lcov.info`

## 검증
- `pnpm -F @shared-ui/core test:run`
- 통과
- `pnpm -F @shared-ui/core storybook:build`
- 통과
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Checkbox.test.tsx`
- 통과
- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Field.test.tsx --coverage`
- 통과
- `pnpm -F web build`
- 통과
- `pnpm run lint`
- 통과
- `pnpm run test:all`
- 통과

## 결정 사항
- disabled 상태의 checkbox도 checked 상태일 수 있으며, 이 조합은 문서화와 테스트가 필요하다
- GitHub 저장소에서 커버리지를 보이게 하려면 GitHub Actions와 Codecov 조합을 사용한다
- 이 프로젝트에서 Codecov 업로드를 안정적으로 하려면 `lcov` 출력이 필요하다
- 공용 UI 패키지는 안정적인 CI 빌드를 위해 React 타입 의존성도 직접 선언해야 한다

## 다음 작업 후보
- checkbox + helper/error 메시지를 위한 `CheckboxField` 또는 필드 레이아웃 패턴 추가
- 다음 입력 컴포넌트로 `Select`, `Radio`, `Switch` 중 하나 추가
- 첫 성공 업로드 이후 README의 Codecov 배지가 정상 반영되는지 확인
