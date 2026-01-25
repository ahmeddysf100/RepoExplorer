import type { SearchReposResponse } from '@/core/types/repo.types'

const GITHUB_API = 'https://api.github.com'

export async function searchRepos(q: string): Promise<SearchReposResponse> {
  const res = await fetch(
    `${GITHUB_API}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&per_page=30`
  )
  if (!res.ok) throw new Error('GitHub API error')
  return res.json()
}
