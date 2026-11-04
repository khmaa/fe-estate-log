# Day 116 Summary

## Goal

Strengthened the shared Button loading semantics so assistive technology can identify when an action is in progress.

## Completed Work

- Automatically applied `aria-busy="true"` to loading Buttons.
- Ensured the actual loading state takes precedence over a consumer-provided `aria-busy={false}` value.
- Preserved existing `aria-busy` values while the Button is not loading.
- Covered the native disabled state and blocked click callback while loading.
- Verified that the default Button does not receive an unnecessary `aria-busy` attribute.

## Changed Files

- `libs/shared-ui/src/components/Button.tsx`
- `libs/shared-ui/src/components/tests/Button.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Button.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`feat/shared-ui-button-loading-semantics`

## Commit

```text
feat: 공통 Button 로딩 접근성 상태 추가

- loading Button에 aria-busy 상태 자동 제공
- 실제 loading 상태가 사용자 지정 busy 값보다 우선하도록 처리
- 평상시 aria-busy 속성 보존 및 기본 상태 검증
- loading 중 클릭 차단과 앱 버튼 흐름 회귀 검증
- 116일차 공통 Button 접근성 작업 기록
```
