const e = import.meta.env

function num(key: string, fallback: number): number {
  const v = e[key]
  if (v == null || v === '') return fallback
  const n = parseInt(String(v), 10)
  return Number.isNaN(n) ? fallback : n
}

function str(key: string, fallback: string): string {
  const v = e[key]
  return typeof v === 'string' && v.trim() ? v.trim() : fallback
}

export const config = {
  appName: str('VITE_APP_NAME', 'RepoExplorer'),
  appTitleDefault: str('VITE_APP_TITLE_DEFAULT', 'RepoExplorer - GitHub Repository Explorer'),
  github: {
    baseUrl: str('VITE_GITHUB_BASE_URL', 'https://github.com').replace(/\/$/, ''),
    token: (typeof e.VITE_GITHUB_API_TOKEN === 'string' && e.VITE_GITHUB_API_TOKEN.trim()
      ? e.VITE_GITHUB_API_TOKEN.trim()
      : undefined) as string | undefined,
  },
  debounceMs: num('VITE_DEBOUNCE_MS', 500),
  searchPerPage: num('VITE_SEARCH_PER_PAGE', 12),
  maxSearchResults: num('VITE_MAX_SEARCH_RESULTS', 1000),
  searchPlaceholder: str('VITE_SEARCH_PLACEHOLDER', 'Search for repositories (e.g. facebook/react)...'),
  searchHeroTitle: str('VITE_SEARCH_HERO_TITLE', 'Search Repositories'),
  searchHeroSubtitle: str(
    'VITE_SEARCH_HERO_SUBTITLE',
    'Explore over 200 million public repositories on GitHub. Find projects, developers, and code easily.'
  ),
  repoCommitsPerPage: num('VITE_REPO_COMMITS_PER_PAGE', 5),
  repoContributorsPerPage: num('VITE_REPO_CONTRIBUTORS_PER_PAGE', 5),
} as const

export const maxSearchPage = Math.max(1, Math.floor(config.maxSearchResults / config.searchPerPage))
