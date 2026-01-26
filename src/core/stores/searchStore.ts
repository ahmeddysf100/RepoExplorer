import { create } from 'zustand'
import type { Repo } from '@/core/types/repo.types'
import type { SortOption } from '@/core/types/repo.types'

interface SearchState {
  query: string
  repos: Repo[]
  totalCount: number
  isLoading: boolean
  error: string | null
  page: number
  sortOption: SortOption
  setQuery: (q: string) => void
  setRepos: (r: Repo[]) => void
  setTotalCount: (n: number) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  setPage: (p: number) => void
  setSortOption: (s: SortOption) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  repos: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  page: 1,
  sortOption: 'best',
  setQuery: (query) => set({ query, page: 1 }),
  setRepos: (repos) => set({ repos, error: null }),
  setTotalCount: (totalCount) => set({ totalCount }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ page }),
  setSortOption: (sortOption) => set({ sortOption, page: 1 }),
}))
