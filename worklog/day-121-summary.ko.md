# 121일차 요약

## 목표

공통 Switch의 상태 전환이 사용자의 모션 감소 설정을 존중하도록 개선했습니다.

## 완료한 작업

- Switch track의 색상 전환을 모션 감소 환경에서 즉시 반영하도록 했습니다.
- Switch thumb의 좌우 이동 전환을 모션 감소 환경에서 즉시 반영하도록 했습니다.
- 기본 환경의 기존 200ms 색상 및 위치 전환은 유지했습니다.
- checked, disabled, change callback을 포함한 기존 Switch 동작을 유지했습니다.
- 단위 테스트에서 track과 thumb의 기본 transition과 모션 감소 variant를 각각 검증했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Switch.tsx`
- `libs/shared-ui/src/components/tests/Switch.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Switch.test.tsx src/components/tests/SwitchField.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/features/visit-logs/components/VisitLogFilters.test.tsx src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-switch-reduced-motion`

## 커밋

```text
fix: 공통 Switch 모션 감소 대응

- Switch track 색상 전환에 모션 감소 상태 적용
- Switch thumb 위치 전환에 모션 감소 상태 적용
- 단위 및 웹 통합 테스트로 기존 동작 검증
- 121일차 공통 UI 접근성 작업 기록
```
