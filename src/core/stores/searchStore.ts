import { create } from 'zustand'
import type { Repo } from '@/core/types/repo.types'

interface SearchState {
  query: string
  repos: Repo[]
  isLoading: boolean
  error: string | null
  setQuery: (q: string) => void
  setRepos: (r: Repo[]) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  repos: [],
  isLoading: false,
  error: null,
  setQuery: (query) => set({ query }),
  setRepos: (repos) => set({ repos, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
