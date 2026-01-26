import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Mode = 'light' | 'dark'

function getInitialMode(): Mode {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('repo-explorer-theme')
  if (stored) {
    try {
      const p = JSON.parse(stored)
      if (p?.state?.mode === 'dark') return 'dark'
    } catch {}
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

interface ThemeState {
  mode: Mode
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: getInitialMode(),
      toggle: () =>
        set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'repo-explorer-theme' }
  )
)
