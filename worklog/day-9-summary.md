# Day 9 Summary

## Overview
- Added `Alert` as the first shared feedback/message component.
- Added `Switch` as a setting-oriented boolean input component.
- Expanded the semantic color token system to support more feedback states.
- Continued balancing the shared UI layer across forms, layout, and feedback primitives.

## Completed Work

### 1. Added `Alert`
- Created `libs/shared-ui/src/components/Alert.tsx`
- Added:
- `Alert`
- `AlertTitle`
- `AlertDescription`
- Supported variants:
- `info`
- `success`
- `warning`
- `error`
- Implemented a role-based feedback container using `role="alert"`

### 2. Added `Alert` stories
- Created `libs/shared-ui/src/components/Alert.stories.tsx`
- Added stories for:
- `Info`
- `Success`
- `Warning`
- `Error`

### 3. Added `Alert` tests
- Created `libs/shared-ui/src/components/tests/Alert.test.tsx`
- Verified:
- title rendering
- description rendering
- error variant styles
- `className` passthrough

### 4. Expanded semantic feedback tokens
- Updated `styles/tokens.css`
- Updated `tailwind.preset.js`
- Added semantic color pairs for:
- `info`
- `info-soft`
- `success`
- `success-soft`
- `warning`
- `warning-soft`
- Reused the existing `danger` token pair for error states

### 5. Added `Switch`
- Created `libs/shared-ui/src/components/Switch.tsx`
- Implemented a setting-focused toggle UI
- Internally used a checkbox input with a peer-based visual track/thumb pattern
- Supported:
- checked state
- disabled state
- `onChange`
- `className`

### 6. Added `Switch` stories
- Created `libs/shared-ui/src/components/Switch.stories.tsx`
- Added stories for:
- `Default`
- `Checked`
- `Disabled`
- `DisabledChecked`
- `WithLabel`

### 7. Added `Switch` tests
- Created `libs/shared-ui/src/components/tests/Switch.test.tsx`
- Verified:
- checkbox rendering
- checked state
- disabled state
- `onChange` behavior

### 8. Updated exports
- Updated `libs/shared-ui/src/index.ts`
- Exported:
- `Alert`
- `AlertTitle`
- `AlertDescription`
- `AlertProps`
- `AlertTitleProps`
- `AlertDescriptionProps`
- `AlertVariant`
- `Switch`
- `SwitchProps`

## Validation
- `pnpm -F @shared-ui/core test:run`
- passed
- `pnpm -F @shared-ui/core storybook:build`
- passed

## Decisions
- Feedback UI should use semantic tokens rather than raw color values
- `Alert` should remain an inline feedback component instead of using a portal-based pattern
- `Switch` should represent setting on/off state, distinct from action-style toggle buttons

## Suggested Next Steps
- Add `Badge` as a lightweight status/label component
- Add `EmptyState` or `Notice` as another feedback-oriented primitive
- Update the `web` preview to include `Alert` and `Switch`
- Improve remaining branch coverage in `CheckboxField` and `RadioGroup`
