# Day 125 Summary

## Goal

Improved the shared `showToast` helper so consumers can explicitly control assistive technology announcement priority for their usage context.

## Completed Work

- Added the Radix Toast `type` option to `ShowToastOptions`.
- Connected `ToastHostProvider` so it forwards the helper type to the rendered Toast.
- Preserved the existing variant-based default priority when type is omitted.
- Verified that an error variant with an explicit `background` type uses the polite announcer.
- Preserved the existing Toast display, default options, and external and internal dismiss behavior.

## Changed Files

- `libs/shared-ui/src/components/useToast.ts`
- `libs/shared-ui/src/components/ToastHost.tsx`
- `libs/shared-ui/src/components/tests/ToastHost.test.tsx`

## Verification

- Successfully ran `pnpm -F @shared-ui/core exec vitest run src/components/tests/Toast.test.tsx src/components/tests/ToastHost.test.tsx src/components/tests/useToast.test.tsx`.
- Successfully ran `pnpm -F web exec vitest run src/App.test.tsx`.
- Successfully ran `pnpm -F @shared-ui/core storybook:build`.
- Successfully ran `pnpm run format:check`.
- Successfully ran `pnpm run lint`.
- Successfully ran `pnpm run build:web`.
- Successfully ran `git diff --check`.

## Branch

`feat/shared-ui-toast-host-announcement-type`

## Commit

```text
feat: 공통 Toast 헬퍼 알림 타입 지원

- ShowToastOptions에 Radix announcement type 추가
- ToastHostProvider에서 명시적인 type 전달
- helper 경로의 polite override 테스트 보강
- 125일차 공통 Toast 접근성 작업 기록
```
