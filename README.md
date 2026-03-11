# fe-estate-log

Frontend monorepo for building and learning a real estate exploration log service.

[한국어 README](./README.ko.md)

## Overview

This repository is a learning-oriented frontend monorepo.
It is used to practice project architecture, workspace design, reusable UI package development, and test setup from scratch.

The service concept is a real estate exploration log platform for recording notes and impressions collected while visiting properties or neighborhoods.

## Workspace Structure

```text
apps/
  web/            Main React application
libs/
  shared-ui/      Shared UI component library
ai-context/       Local AI context notes (git-ignored)
```

## Tech Stack

- `pnpm` workspaces
- `React`
- `TypeScript`
- `Vite`
- `Vitest`
- `Testing Library`

## Prerequisites

- `Node.js` 20+ recommended
- `pnpm` installed globally

## Install Dependencies

```bash
pnpm install
```

## Run the Project

To start the main web application:

```bash
pnpm -F web dev
```

The Vite dev server will run for the `apps/web` project.

## Run Tests

Run tests for the shared UI library:

```bash
pnpm -F @shared-ui/core test:run
```

Run tests for the web application:

```bash
pnpm -F web test:run
```

Run tests for every workspace package that has a `test:run` script:

```bash
pnpm -r --if-present test:run
```

Both `web` and `shared-ui` are configured to print coverage summaries in the console by default.

## Run by Project

### `apps/web`

Start dev server:

```bash
pnpm -F web dev
```

Run tests:

```bash
pnpm -F web test:run
```

Open Vitest UI:

```bash
pnpm -F web test:ui
```

Build the app:

```bash
pnpm -F web build
```

### `libs/shared-ui`

Run tests:

```bash
pnpm -F @shared-ui/core test:run
```

Open Vitest UI:

```bash
pnpm -F @shared-ui/core test:ui
```

## Current Scope

- Build a reusable shared UI package
- Develop the main web application on top of the shared package
- Practice package-level testing in a monorepo
- Document architecture decisions and learning context

## License

MIT
