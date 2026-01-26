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
