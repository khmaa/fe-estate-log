# 112일차 요약

## 목표

라벨과 설명이 있는 Switch 패턴을 공통 SwitchField로 통합해 접근성 연결과 상태 표현을 재사용할 수 있도록 개선했습니다.

## 완료한 작업

- `SwitchField`에 라벨, 도움말, 오류, 필수 및 비활성 상태 API를 추가했습니다.
- Switch와 라벨을 자동으로 연결하고 도움말 및 오류 참조를 접근성 속성에 반영했습니다.
- 기존 `aria-describedby`를 공통 도움말 참조와 병합하도록 구성했습니다.
- 공통 컴포넌트 단위 테스트와 Storybook 상태 예시를 추가했습니다.
- 임장 기록 고정 필터와 Showcase 릴리스 알림을 `SwitchField`로 교체했습니다.
- 기존 영문 및 한글 화면 문구와 스위치 상호작용이 유지되는지 앱 테스트로 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/SwitchField.tsx`
- `libs/shared-ui/src/components/tests/SwitchField.test.tsx`
- `libs/shared-ui/src/components/SwitchField.stories.tsx`
- `libs/shared-ui/src/index.ts`
- `apps/web/src/features/visit-logs/components/VisitLogFilters.tsx`
- `apps/web/src/pages/ShowcasePage.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/SwitchField.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-switch-field`

## 커밋

```text
feat: 공통 SwitchField 컴포넌트 추가

- Switch 라벨과 상태 설명의 접근성 연결 통합
- 도움말, 오류, 필수 및 비활성 상태 지원
- 임장 필터와 Showcase의 중복 Switch field 구조 교체
- 단위 테스트와 Storybook 상태 예시 추가
- 112일차 공통 폼 컴포넌트 작업 기록
```
