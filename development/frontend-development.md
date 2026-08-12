---
title: Frontend Development
sidebar_position: 3
keywords: [frontend, React, TypeScript]
---

# Frontend Development

Routes are in `frontend/src/routes/index.ts`.

Workspaces are in `frontend/src/features/`.

Validate:

```bash
cd <repo-root>/frontend
npm exec tsc -- --noEmit
node node_modules/vite/bin/vite.js build
```

## Structure

Important folders:

- `frontend/src/features/` for workspace-level UI;
- `frontend/src/components/` for shared UI atoms;
- `frontend/src/hooks/` for query/mutation and reusable state hooks;
- `frontend/src/providers/` for app-wide providers;
- `frontend/src/styles/` for layered global CSS;
- `frontend/src/api/client.ts` for API types and wrappers.

## Routing

NetMap does not use `react-router`. Routes are string values in `frontend/src/routes/index.ts`. Add new routes there so navigation, document titles, and route metadata stay consistent.

## Styling

Before changing UI styles, read:

- `docs/UI_THEME_RULES.md`;
- `docs/design-system-preview.html`.

Prefer existing `nm-*` classes for buttons, panels, tables, forms, and toolbar patterns.

## Related Pages

- [Backend Development](./backend-development.md)
- [Testing](./testing.md)
- [Adding API Endpoints](./adding-api-endpoints.md)
