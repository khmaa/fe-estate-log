# Day 17 Summary

## What I worked on

- Added a create mutation flow to the `visit-logs` feature using the feature-based layered structure.
- Introduced a feature-level create dialog backed by `api`, `service`, and `hook` layers.
- Extended the MSW visit log handlers with `POST /api/visit-logs` and mutable in-memory mock state.
- Localized the visit log mock data shown in the web app to Korean.
- Added targeted tests for the create API, service, mutation hook, dialog flow, and dialog state branches.

## Key changes

- Added `createVisitLog.ts`, `createVisitLog.service.ts`, and `useCreateVisitLog.ts`.
- Added `VisitLogCreateDialog` and wired it into `VisitLogsScreen`.
- Added create-flow tests and extra state-branch coverage for `VisitLogCreateDialog`.
- Updated MSW handlers and mock data helpers to support create mutations and reset between tests.

## Validation

- `pnpm run format:check`
- `pnpm run lint`
- `pnpm -F web test:run`
- `pnpm -F web build`

## Notes

- CI was passing while `codecov/patch` failed on `VisitLogCreateDialog` branch coverage.
- Added a dedicated state test to cover error, pending, and cancel-close reset paths.
