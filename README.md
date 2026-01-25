# RepoExplorer

GitHub Repository Explorer — search and browse public repositories.

## Tech Stack

- **React** + **TypeScript**
- **Zustand** (state)
- **Material-UI** (UI)
- **React Router** (routing)
- **Vite** (build)

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview build

## Project Structure (Clean Architecture)

```
RepoExplorer/
├── public/
│   └── vite.svg
├── src/
│   ├── app/                    # App bootstrap
│   │   ├── App.tsx             # ThemeProvider, Router, CssBaseline
│   │   ├── routes.tsx          # React Router routes
│   │   ├── theme.ts            # MUI theme
│   │   └── styles.css
│   ├── core/                   # Domain & infra
│   │   ├── api/
│   │   │   └── github.api.ts   # GitHub Search API
│   │   ├── stores/
│   │   │   └── searchStore.ts  # Zustand store
│   │   ├── types/
│   │   │   └── repo.types.ts   # Repo, SearchReposResponse
│   │   └── index.ts
│   ├── features/               # Feature modules
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   └── SearchInput.tsx
│   │   │   └── index.ts
│   │   └── repos/
│   │       ├── components/
│   │       │   └── RepoCard.tsx
│   │       └── index.ts
│   ├── pages/                  # Route-level pages
│   │   ├── SearchPage.tsx      # Search + debounce + API + RepoCard list
│   │   └── RepoDetailPage.tsx  # Placeholder for /repo/:owner/:name
│   ├── shared/
│   │   ├── layout/
│   │   │   └── AppLayout.tsx   # AppBar + Outlet
│   │   └── hooks/
│   │       └── useDebounce.ts  # 500ms debounce
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json                # React, TS, Zustand, MUI, react-router-dom
├── vite.config.ts              # @ alias → src/
├── tsconfig.json
├── eslint.config.js
└── README.md
```

## Routes

- `/search` — search repositories (debounced 500ms, GitHub API)
- `/repo/:owner/:name` — repository detail (placeholder)

## Features

- Debounced search (500ms)
- GitHub Search API integration
- Loading / error / empty states
- Reusable `SearchInput`, `RepoCard`
- Responsive layout (MUI)
