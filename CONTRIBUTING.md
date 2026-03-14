# Contributing

This repository is a learning-oriented frontend monorepo.
The goal of this document is to keep development conventions simple, consistent, and easy to follow.

[한국어 문서](./CONTRIBUTING.ko.md)

## Repository Structure

- `apps/web`: main application
- `libs/shared-ui`: shared UI component package

## Branch Naming

Use the following format for branch names:

```text
type/scope-short-description
```

Recommended examples:

- `feat/shared-ui-button`
- `feat/shared-ui-storybook`
- `fix/web-routing-error`
- `docs/root-readme-storybook`
- `chore/shared-ui-test-setup`

Guidelines:

- Use a clear `type` such as `feat`, `fix`, `docs`, `test`, or `chore`
- Use repository scopes such as `shared-ui`, `web`, or `root`
- Keep the description short and written in kebab-case
- Avoid vague names such as `feat/button`, `fix/bug`, or `test/config`

## Commit Messages

Use concise conventional-style commit messages.

Recommended format:

```text
type: short summary
```

Examples:

- `feat: add shared-ui Button component`
- `feat: add shared-ui Storybook and Button stories`
- `docs: update root README with Storybook usage`
- `test: add Button unit tests`

If more detail is helpful, add a multi-line body with bullets.

## Development Flow

Typical workflow:

1. Create a focused branch
2. Make changes in a single area or concern
3. Run relevant tests
4. Run Storybook when working on shared UI components
5. Commit with a clear message

## Testing

Run all workspace tests that expose `test:run`:

```bash
pnpm -r --if-present test:run
```

Run tests for the web app only:

```bash
pnpm -F web test:run
```

Run tests for the shared UI package only:

```bash
pnpm -F @shared-ui/core test:run
```

## Storybook

Storybook is used for isolated shared component review in `libs/shared-ui`.

Run Storybook:

```bash
pnpm -F @shared-ui/core storybook
```

Build Storybook:

```bash
pnpm -F @shared-ui/core storybook:build
```

When adding a shared UI component, add a corresponding story so the component can be reviewed independently.
