# RepoExplorer

GitHub Repository Explorer — search and browse public repositories.

## Tech Stack

- **React** + **TypeScript**
- **Zustand** (state)
- **Material-UI** (UI)
- **React Router** (routing)
- **Vite** (build)
- **react-markdown** + **remark-gfm** (README rendering)
- **@octokit/core** (GitHub API)

## Setup

```bash
npm install
cp .env   # optional: copy env template, edit as needed
npm run dev
```

## Environment

All configurable values come from env (see `.env.example`). Copy to `.env` and override as needed.

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_APP_NAME` | RepoExplorer | App display name |
| `VITE_APP_TITLE_DEFAULT` | RepoExplorer - GitHub... | Default document title |
| `VITE_GITHUB_BASE_URL` | https://github.com | GitHub base URL for links |
| `VITE_GITHUB_API_TOKEN` | — | Optional PAT for higher rate limits |
| `VITE_DEBOUNCE_MS` | 500 | Search input debounce (ms) |
| `VITE_SEARCH_PER_PAGE` | 12 | Search results per page |
| `VITE_MAX_SEARCH_RESULTS` | 1000 | Max search results cap |
| `VITE_SEARCH_PLACEHOLDER` | Search for repositories... | Search input placeholder |
| `VITE_SEARCH_HERO_TITLE` | Search Repositories | Hero heading |
| `VITE_SEARCH_HERO_SUBTITLE` | Explore over 200 million... | Hero subtitle |
| `VITE_REPO_COMMITS_PER_PAGE` | 5 | Commits on detail page |
| `VITE_REPO_CONTRIBUTORS_PER_PAGE` | 5 | Contributors on detail page |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview build
- `npm run lint` — run ESLint

## Project Structure (Clean Architecture)

```
RepoExplorer/
├── public/
│   └── vite.svg
├── src/
│   ├── app/                    # App bootstrap
│   │   ├── App.tsx             # ThemeProvider, Router, CssBaseline
│   │   ├── routes.tsx          # React Router routes
│   │   ├── theme.ts            # MUI light/dark themes
│   │   └── styles.css
│   ├── core/                   # Domain & infra
│   │   ├── api/
│   │   │   └── github.api.ts   # Search + repo detail, README, commits, contributors, languages
│   │   ├── stores/
│   │   │   ├── searchStore.ts  # Search state
│   │   │   └── themeStore.ts   # Light/dark theme
│   │   ├── types/
│   │   │   └── repo.types.ts   # Repo, CommitItem, ContributorItem, etc.
│   │   └── index.ts
│   ├── features/
│   │   ├── search/
│   │   │   ├── components/     # SearchInput, SearchHero, SearchPagination
│   │   │   └── index.ts
│   │   ├── repos/
│   │   │   ├── components/     # RepoCard
│   │   │   └── index.ts
│   │   └── repo-detail/
│   │       ├── components/     # RepoReadme, RepoTopics, RepoContributors, RepoLanguages, RepoCommits
│   │       └── index.ts
│   ├── pages/
│   │   ├── SearchPage.tsx      # Search + debounce + API + RepoCard grid
│   │   └── RepoDetailPage.tsx  # Repo detail: hero, README, commits, sidebar (topics, contributors, languages)
│   ├── shared/
│   │   ├── layout/
│   │   │   └── AppLayout.tsx   # NavBar (Back to Search, Open in GitHub on detail), Footer
│   │   ├── hooks/
│   │   │   └── useDebounce.ts  # 500ms debounce
│   │   ├── utils/
│   │   │   └── format.ts       # formatCount, formatRelativeTime
│   │   └── config.ts           # env-based config (VITE_*)
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts              # @ alias → src/
├── tsconfig.json
├── eslint.config.js
└── README.md
```

## Routes

- `/search` — search repositories (debounced 500ms, GitHub Search API), sort, pagination
- `/repo/:owner/:name` — repository detail (README, recent commits, topics, contributors, languages)

## Features

- Debounced search (500ms), sort options, pagination (max 1000 results)
- GitHub Search API + repo detail APIs (Octokit)
- Repo detail: README (markdown), recent commits, topics, contributors, languages
- NavBar: “Back to Search” + “Open in GitHub” on detail route; theme toggle
- Loading / error / empty states
- Reusable `SearchInput`, `RepoCard`, repo-detail components
- Responsive layout (MUI), light/dark theme
