# Button Component – SRS

## 1. Overview

The Button component is a reusable UI component provided by the `shared-ui` package.
It serves as a foundational interactive element across multiple applications within the monorepo.

## 2. Functional Requirements

- The Button **must render a native `<button>` HTML element**
- The Button **must accept all standard HTML button attributes**
  - e.g. `onClick`, `disabled`, `type`
- The Button **must support children as its content**
- The Button **must forward all received props to the underlying button element**

## 3. Non-Functional Requirements

- The Button **must be framework-agnostic within React**
- The Button **must not contain business logic**
- The Button **must not manage internal state**
- The Button **must be usable without additional styling**
- The Button **must be tree-shakeable**

## 4. Public API

```ts
export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export const Button: React.FC<ButtonProps>;
```
