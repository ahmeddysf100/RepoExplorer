import { IconButton, Button, Box } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface SearchPaginationProps {
  page: number
  totalCount: number
  perPage: number
  maxPages?: number
  onPageChange: (page: number) => void
}

export function SearchPagination({
  page,
  totalCount,
  perPage,
  maxPages,
  onPageChange,
}: SearchPaginationProps) {
  const totalPages = Math.max(
    1,
    maxPages != null
      ? Math.min(maxPages, Math.ceil(totalCount / perPage))
      : Math.ceil(totalCount / perPage)
  )
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const showPages = (() => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('ellipsis')
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      if (page < totalPages - 2) pages.push('ellipsis')
      if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  })()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton
        size="small"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          '&:hover': { bgcolor: 'action.hover' },
          '&.Mui-disabled': { opacity: 0.5 },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      {showPages.map((p, i) =>
        p === 'ellipsis' ? (
          <Box key={`e-${i}`} component="span" sx={{ px: 1, color: 'text.secondary' }}>
            …
          </Box>
        ) : (
          <Button
            key={p}
            variant={p === page ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onPageChange(p)}
            sx={{
              minWidth: 40,
              borderRadius: 2,
              borderColor: 'divider',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
            }}
          >
            {p}
          </Button>
        )
      )}
      <IconButton
        size="small"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          '&:hover': { bgcolor: 'action.hover' },
          '&.Mui-disabled': { opacity: 0.5 },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}
