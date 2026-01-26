import { useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  type SelectChangeEvent,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import { SearchHero, SearchPagination } from '@/features/search'
import { RepoCard } from '@/features/repos'
import { useDebounce } from '@/shared/hooks/useDebounce'
import {
  useSearchStore,
  searchRepos,
  getGitHubApiErrorMessage,
  type SortOption,
} from '@/core'
import { config, maxSearchPage } from '@/shared/config'

export function SearchPage() {
  const {
    query,
    setQuery,
    repos,
    totalCount,
    isLoading,
    error,
    setRepos,
    setTotalCount,
    setLoading,
    setError,
    page,
    setPage,
    sortOption,
    setSortOption,
  } = useSearchStore()
  const debouncedQuery = useDebounce(query, config.debounceMs)

  const runSearch = useCallback(
    (q: string, p: number = page, s: SortOption = sortOption) => {
      if (!q.trim()) {
        setRepos([])
        setTotalCount(0)
        return
      }
      setLoading(true)
      setError(null)
      searchRepos(q, {
        sortOption: s,
        page: Math.min(Math.max(1, p), maxSearchPage),
        per_page: config.searchPerPage,
      })
        .then((res) => {
          setRepos(res.items)
          setTotalCount(Math.min(res.total_count, config.maxSearchResults))
        })
        .catch((e) => {
          setError(getGitHubApiErrorMessage(e))
        })
        .finally(() => setLoading(false))
    },
    [
      page,
      sortOption,
      setRepos,
      setTotalCount,
      setLoading,
      setError,
    ]
  )

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setRepos([])
      setTotalCount(0)
      return
    }
    runSearch(debouncedQuery, 1, sortOption)
  }, [debouncedQuery])

  useEffect(() => {
    if (!debouncedQuery.trim()) return
    runSearch(debouncedQuery, page, sortOption)
  }, [page, sortOption])

  const handleSearchClick = () => {
    setPage(1)
    runSearch(query, 1, sortOption)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearchClick()
  }
  const handleSortChange = (e: SelectChangeEvent<SortOption>) =>
    setSortOption(e.target.value as SortOption)

  const hasSearched = debouncedQuery.trim().length > 0
  const showResults = hasSearched && !isLoading && !error

  return (
    <Box>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          {config.searchHeroTitle}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
        >
          {config.searchHeroSubtitle}
        </Typography>
        <SearchHero
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          onSearch={handleSearchClick}
          onKeyDown={handleKeyDown}
          showResults={showResults}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          totalCount={totalCount}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !error && hasSearched && repos.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={6}>
          No repositories found.
        </Typography>
      )}

      {showResults && repos.length > 0 && (
        <>
          <Grid container spacing={3}>
            {repos.map((repo) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={repo.id}>
                <RepoCard repo={repo} />
              </Grid>
            ))}
          </Grid>
          {Math.ceil(totalCount / config.searchPerPage) > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <SearchPagination
                page={Math.min(page, maxSearchPage)}
                totalCount={totalCount}
                perPage={config.searchPerPage}
                maxPages={maxSearchPage}
                onPageChange={setPage}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
