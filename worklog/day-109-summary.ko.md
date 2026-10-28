# 109일차 요약

## 목표

공통 Switch가 접근성 트리에서 일반 checkbox가 아니라 켜짐/꺼짐 상태를 가진 switch control로 명확히 노출되도록 개선했습니다.

## 완료한 작업

- `Switch`의 네이티브 checkbox input에 `role="switch"`를 추가했습니다.
- Switch 단위 테스트가 switch role의 기본, checked, disabled, 변경 동작을 검증하도록 수정했습니다.
- 임장 기록의 pinned 필터 컴포넌트 테스트를 switch semantics에 맞게 수정했습니다.
- 앱 통합 테스트의 pinned 필터 조회도 switch role을 사용하도록 정리했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Switch.tsx`
- `libs/shared-ui/src/components/tests/Switch.test.tsx`
- `apps/web/src/features/visit-logs/components/VisitLogFilters.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Switch.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`feat/shared-ui-switch-semantics`

## 커밋

```text
feat: Expose shared switch semantics

- Render shared switches with the switch role
- Update component and visit log filter role expectations
- Cover switch semantics through app integration tests
- Document day 109 shared form control follow-up
```
