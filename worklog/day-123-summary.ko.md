# 123일차 요약

## 목표

공통 Banner가 기본 live-region 의미를 유지하면서 사용 맥락에 필요한 명시적인 role을 존중하도록 개선했습니다.

## 완료한 작업

- Banner의 기본 role을 기존과 동일한 polite `status`로 유지했습니다.
- 소비자가 명시한 `region`, `alert` 등의 role이 기본값보다 우선하도록 구성했습니다.
- labeled region으로 사용하는 Banner가 접근성 이름과 명시적인 role을 유지하는지 검증했습니다.
- Showcase 통합 테스트에서 기존 배너의 status 의미가 유지되는지 확인했습니다.
- Alert와 Banner의 명시적인 role 처리 방식을 일관되게 정리했습니다.

## 변경 파일

- `libs/shared-ui/src/components/Banner.tsx`
- `libs/shared-ui/src/components/tests/Banner.test.tsx`
- `apps/web/src/App.test.tsx`

## 검증

- `pnpm -F @shared-ui/core exec vitest run src/components/tests/Banner.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F web exec vitest run src/App.test.tsx`를 성공적으로 실행했습니다.
- `pnpm -F @shared-ui/core storybook:build`를 성공적으로 실행했습니다.
- `pnpm run format:check`를 성공적으로 실행했습니다.
- `pnpm run lint`를 성공적으로 실행했습니다.
- `pnpm run build:web`를 성공적으로 실행했습니다.
- `git diff --check`를 성공적으로 실행했습니다.

## 브랜치

`fix/shared-ui-banner-role-override`

## 커밋

```text
fix: 공통 Banner role override 지원

- Banner의 기본 status 의미 유지
- 명시적인 role이 기본값보다 우선하도록 개선
- labeled region 및 Showcase 통합 테스트 보강
- 123일차 공통 UI 접근성 작업 기록
```
