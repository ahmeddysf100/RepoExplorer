import { Octokit } from '@octokit/core'
import type {
  SearchReposResponse,
  SortOption,
  CommitItem,
  ContributorItem,
  LanguageWithPercent,
  Repo,
} from '@/core/types/repo.types'
import { config } from '@/shared/config'

const octokit = new Octokit(config.github.token ? { auth: config.github.token } : {})

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
  const { sortOption = 'best', page = 1, per_page = config.searchPerPage } = params
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

export async function getRepo(owner: string, name: string): Promise<Repo> {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo: name,
  })
  return data as unknown as Repo
}

export async function getRepoReadme(
  owner: string,
  name: string
): Promise<string | null> {
  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/readme',
      { owner, repo: name }
    )
    const content = (data as { content?: string }).content
    if (!content) return null
    try {
      return atob(content.replace(/\n/g, ''))
    } catch {
      return null
    }
  } catch (e) {
    const err = e as { status?: number }
    if (err?.status === 404) return null
    throw e
  }
}

export async function getRepoCommits(
  owner: string,
  name: string,
  per_page = config.repoCommitsPerPage
): Promise<CommitItem[]> {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/commits',
    { owner, repo: name, per_page }
  )
  const items = data as Array<{
    sha: string
    commit: { message: string; author?: { name?: string; date?: string } }
    author?: { login?: string; avatar_url?: string }
  }>
  return items.map((c) => ({
    sha: c.sha,
    shaShort: c.sha.slice(0, 7),
    message: c.commit.message.split('\n')[0] ?? '',
    authorLogin: c.author?.login ?? c.commit.author?.name ?? '?',
    authorName: c.commit.author?.name ?? c.author?.login ?? '?',
    authorAvatarUrl: c.author?.avatar_url ?? '',
    date: c.commit.author?.date ?? '',
  }))
}

export async function getRepoContributors(
  owner: string,
  name: string,
  per_page = config.repoContributorsPerPage
): Promise<ContributorItem[]> {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contributors',
    { owner, repo: name, per_page }
  )
  return (data as ContributorItem[]).map((c) => ({
    login: c.login,
    avatar_url: c.avatar_url,
    contributions: c.contributions,
  }))
}

export async function getRepoLanguages(
  owner: string,
  name: string
): Promise<LanguageWithPercent[]> {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/languages',
    { owner, repo: name }
  )
  const map = data as Record<string, number>
  const total = Object.values(map).reduce((a, b) => a + b, 0)
  if (total === 0) return []
  return Object.entries(map)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / total) * 1000) / 10,
    }))
    .sort((a, b) => b.bytes - a.bytes)
}
