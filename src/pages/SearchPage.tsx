import { useEffect } from 'react'
import { Box, Typography, CircularProgress, Alert, Stack } from '@mui/material'
import { SearchInput } from '@/features/search'
import { RepoCard } from '@/features/repos'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useSearchStore, searchRepos } from '@/core'

const DEBOUNCE_MS = 500

export function SearchPage() {
  const { query, setQuery, repos, isLoading, error, setRepos, setLoading, setError } =
    useSearchStore()
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setRepos([])
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    searchRepos(debouncedQuery)
      .then((res) => {
        if (!cancelled) setRepos(res.items)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Search failed')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [debouncedQuery, setRepos, setLoading, setError])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Search Repositories
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search repositories…"
          disabled={isLoading}
        />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && !error && debouncedQuery && repos.length === 0 && (
        <Typography color="text.secondary">No repositories found.</Typography>
      )}
      {!isLoading && repos.length > 0 && (
        <Stack spacing={2}>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </Stack>
      )}
    </Box>
  )
}
