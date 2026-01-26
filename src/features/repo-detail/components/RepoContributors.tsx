import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import type { ContributorItem } from '@/core/types/repo.types'

interface RepoContributorsProps {
  contributors: ContributorItem[]
  contributorsUrl: string
}

export function RepoContributors({ contributors, contributorsUrl }: RepoContributorsProps) {
  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography
          variant="caption"
          fontWeight="600"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Contributors
        </Typography>
        <Typography variant="caption" fontWeight="700" color="text.secondary">
          {contributors.length}
          {contributors.length >= 5 ? '+' : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        {contributors.slice(0, 5).map((c, i) => (
          <Avatar
            key={c.login}
            src={c.avatar_url}
            alt={c.login}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'background.paper',
              ml: i > 0 ? -1.5 : 0,
            }}
          />
        ))}
        {contributors.length > 5 && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'background.paper',
              ml: -1.5,
              bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.800' : 'grey.200'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            +{contributors.length - 5}
          </Box>
        )}
      </Box>
      <Button
        component="a"
        href={contributorsUrl}
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          textTransform: 'none',
          borderRadius: 1,
          borderColor: 'divider',
          color: 'text.secondary',
          '&:hover': { borderColor: 'divider', bgcolor: 'action.hover' },
        }}
      >
        View all contributors
      </Button>
    </Card>
  )
}
