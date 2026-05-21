# Deployment Checklist

This project can be deployed as a Vercel-hosted demo without a backend server.
The current production demo uses MSW browser handlers because the web app still works with mocked visit log data.

## Vercel Project Settings

Use the repository root as the Vercel project root.
The root `vercel.json` defines the deployment settings:

- install command: `pnpm install --frozen-lockfile`
- build command: `VITE_ENABLE_MSW=true pnpm -F web build`
- output directory: `apps/web/dist`
- SPA rewrite: `/(.*)` -> `/index.html`

Keep `VITE_ENABLE_MSW=true` while the demo has no real backend.
Remove it only after the web app is connected to a deployed API.

## Demo URL

Record the verified production demo URL in the root README `Live Demo` section after the first deployment passes the smoke test.
Do not add a deployment URL before confirming that the demo mode indicator, mock data, and direct route access work in production.

## Pre-Deployment Checks

Run these commands before opening a deployment PR:

```bash
pnpm run format:check
pnpm run lint
pnpm -F web test:run
pnpm -F web build
VITE_ENABLE_MSW=true pnpm -F web build
```

## Post-Deployment Smoke Test

After Vercel deploys the app, verify the deployed URL in a browser:

- The app loads at `/` and redirects to `/visit-logs`.
- The app shell shows `Demo mode` and `Mock data`.
- Visit log list data appears without a backend server.
- The language switch changes app shell and page copy between English and Korean.
- Visit log search, sort, pinned-only filter, active filter removal, and pagination work.
- Creating a visit log shows the success toast and adds the draft to the mocked list.
- Opening a visit log detail route works from the list.
- Directly opening `/visit-logs/:visitLogId` works after a page refresh.
- Editing a visit log shows the update toast and keeps the detail view synced.
- Deleting a visit log shows the delete toast and returns to the list.
- Directly opening an unknown route renders the not found page instead of a Vercel 404.
- The root README `Live Demo` section points to the verified deployment URL after the smoke test passes.

## Troubleshooting

- If the deployed list fails to load, confirm that `VITE_ENABLE_MSW=true` is present in the Vercel build command.
- If direct detail URLs fail, confirm the `rewrites` rule in `vercel.json` is deployed.
- If the demo indicator is missing, confirm the deployed bundle was built with `VITE_ENABLE_MSW=true`.
- If a real backend is added later, remove `VITE_ENABLE_MSW=true` and replace mock handlers with the deployed API configuration.
