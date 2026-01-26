import { Octokit } from '@octokit/core'
import type {
  SearchReposResponse,
  SortOption,
} from '@/core/types/repo.types'

const octokit = new Octokit()

export interface SearchParams {
  sort?: 'stars' | 'forks' | 'updated'
  order?: 'asc' | 'desc'
  page?: number
  per_page?: number
}

function sortOptionToParams(opt: SortOption): Pick<SearchParams, 'sort' | 'order'> {
  switch (opt) {
    case 'stars':
      return { sort: 'stars', order: 'desc' }
    case 'stars-asc':
      return { sort: 'stars', order: 'asc' }
    case 'forks':
      return { sort: 'forks', order: 'desc' }
    case 'forks-asc':
      return { sort: 'forks', order: 'asc' }
    case 'updated':
      return { sort: 'updated', order: 'desc' }
    default:
      return {}
  }
}

export async function searchRepos(
  q: string,
  params: { sortOption?: SortOption; page?: number; per_page?: number } = {}
): Promise<SearchReposResponse> {
  const { sortOption = 'best', page = 1, per_page = 12 } = params
  const { sort, order } = sortOptionToParams(sortOption)
  const { data } = await octokit.request('GET /search/repositories', {
    q,
    page,
    per_page,
    ...(sort && { sort }),
    ...(order && { order }),
  })
  return data as SearchReposResponse
}

/** Extract GitHub API error message from Octokit/request errors. */
export function getGitHubApiErrorMessage(e: unknown): string {
  const err = e as { response?: { data?: { message?: string } }; message?: string }
  if (err?.response?.data && typeof err.response.data.message === 'string') {
    return err.response.data.message
  }
  if (e instanceof Error) return e.message
  return 'Search failed'
}
