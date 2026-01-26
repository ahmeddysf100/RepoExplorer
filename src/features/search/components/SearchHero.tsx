import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { SearchInput } from './SearchInput'
import type { SortOption } from '@/core/types/repo.types'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'best', label: 'Best Match' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'stars-asc', label: 'Fewest Stars' },
  { value: 'forks', label: 'Most Forks' },
  { value: 'forks-asc', label: 'Fewest Forks' },
  { value: 'updated', label: 'Recently Updated' },
]

interface SearchHeroProps {
  query: string
  setQuery: (q: string) => void
  isLoading: boolean
  onSearch: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  showResults: boolean
  sortOption: SortOption
  onSortChange: (e: SelectChangeEvent<SortOption>) => void
  totalCount: number
}

export function SearchHero({
  query,
  setQuery,
  isLoading,
  onSearch,
  onKeyDown,
  showResults,
  sortOption,
  onSortChange,
  totalCount,
}: SearchHeroProps) {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <SearchInput
            value={query}
            onChange={setQuery}
            onKeyDown={onKeyDown}
            disabled={isLoading}
          />
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={onSearch}
          disabled={isLoading}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 1,
            fontWeight: 600,
            boxShadow: (t) =>
              t.palette.mode === 'light'
                ? '0 4px 14px rgba(37, 99, 235, 0.25)'
                : undefined,
          }}
        >
          Search
        </Button>
      </Box>
      {
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.secondary"
            >
              Sort by:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={sortOption}
                label=""
                onChange={onSortChange}
                disabled={!showResults}
                sx={{
                  borderRadius: 1,
                  bgcolor: (t) =>
                    t.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
                  height: '30px',
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Showing{' '}
            <Typography
              component="span"
              fontWeight="bold"
              color="text.primary"
            >
              {totalCount.toLocaleString()}
            </Typography>{' '}
            results
          </Typography>
        </Box>
      }
    </Box>
  )
}
