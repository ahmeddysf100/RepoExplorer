export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  default_branch?: string
  owner: {
    login: string
    avatar_url: string
  }
}

export type SortOption = 'best' | 'stars' | 'stars-asc' | 'forks' | 'forks-asc' | 'updated'

export interface SearchReposResponse {
  total_count: number
  incomplete_results: boolean
  items: Repo[]
}

export interface CommitItem {
  sha: string
  shaShort: string
  message: string
  authorLogin: string
  authorName: string
  authorAvatarUrl: string
  date: string
}

export interface ContributorItem {
  login: string
  avatar_url: string
  contributions: number
}

export type LanguagesMap = Record<string, number>

export interface LanguageWithPercent {
  name: string
  bytes: number
  percent: number
}

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#facc15',
  TypeScript: '#2563eb',
  CSS: '#3b82f6',
  Python: '#16a34a',
  HTML: '#e34c26',
  C: '#94a3b8',
  'C++': '#f34b7d',
  Go: '#00add8',
  Ruby: '#701516',
  Java: '#b07219',
}

export function langColor(lang: string | null): string {
  if (!lang) return '#94a3b8'
  return LANGUAGE_COLORS[lang] ?? '#94a3b8'
}
