# Deployment Checklist

This project can be deployed as a Vercel-hosted demo without a backend server.
The current production demo uses MSW browser handlers because the web app still works with mocked visit log data.

## Vercel Project Settings

Use the repository root as the Vercel project root.
The root `vercel.json` defines the deployment settings:

- install command: `pnpm install --frozen-lockfile`
- build command: `pnpm run build:web:demo`
- output directory: `apps/web/dist`
- SPA rewrite: `/(.*)` -> `/index.html`

Keep `build:web:demo` configured with `VITE_ENABLE_MSW=true` while the demo has no real backend.
Remove that flag only after the web app is connected to a deployed API.

## Create the Vercel Project

Use this flow when connecting the repository to Vercel for the first time:

1. Import the GitHub repository from the Vercel dashboard.
2. Set the project root to the repository root, not `apps/web`.
3. Keep the framework preset as Vite if Vercel detects it automatically.
4. Confirm that Vercel reads the root `vercel.json` settings.
5. Confirm the install command is `pnpm install --frozen-lockfile`.
6. Confirm the build command is `pnpm run build:web:demo`.
7. Confirm the output directory is `apps/web/dist`.
8. Deploy the project and run the post-deployment smoke test before sharing the URL.

Do not add a separate Vercel environment variable for `VITE_ENABLE_MSW` while `build:web:demo` already sets it.
If the project later switches to a real backend, update `build:web:demo` and then add the backend API environment variables in Vercel.

## Demo URL

Record the verified production demo URL in the root README `Live Demo` section after the first deployment passes the smoke test.
Do not add a deployment URL before confirming that the demo mode indicator, mock data, and direct route access work in production.

## Pre-Deployment Checks

Run this command before opening a deployment PR:

```bash
pnpm run deploy:check
```

The script runs formatting checks, lint, workspace tests, the normal web build, and the demo web build used by Vercel.

## Post-Deployment Smoke Test

After Vercel deploys the app, paste this checklist into the PR or release note and verify the deployed URL in a browser.

```text
Smoke test target
- URL:
- Verified by:
- Verified at:

Checks
- [ ] The app loads at `/` and redirects to `/visit-logs`.
- [ ] The app shell shows `Demo mode` and `Mock data`.
- [ ] Visit log list data appears without a backend server.
- [ ] The language switch changes app shell and page copy between English and Korean.
- [ ] Visit log search, sort, pinned-only filter, active filter removal, and pagination work.
- [ ] Creating a visit log shows the success toast and adds the draft to the mocked list.
- [ ] Opening a visit log detail route works from the list.
- [ ] Directly opening `/visit-logs/:visitLogId` works after a page refresh.
- [ ] Editing a visit log shows the update toast and keeps the detail view synced.
- [ ] Deleting a visit log shows the delete toast and returns to the list.
- [ ] Directly opening an unknown route renders the not found page instead of a Vercel 404.
- [ ] The root README `Live Demo` section points to the verified deployment URL after the smoke test passes.
```

## Troubleshooting

- If the deployed list fails to load, confirm that `build:web:demo` still builds with `VITE_ENABLE_MSW=true`.
- If direct detail URLs fail, confirm the `rewrites` rule in `vercel.json` is deployed.
- If the demo indicator is missing, confirm the deployed bundle was built with `VITE_ENABLE_MSW=true`.
- If a real backend is added later, remove `VITE_ENABLE_MSW=true` and replace mock handlers with the deployed API configuration.
