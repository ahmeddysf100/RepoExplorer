import { Avatar, Box, Card, Link, Typography } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { formatRelativeTime } from '@/shared/utils/format'
import type { CommitItem } from '@/core/types/repo.types'
import { config } from '@/shared/config'
import { memo } from 'react'

interface RepoCommitsProps {
  commits: CommitItem[]
  owner: string
  name: string
}

export const RepoCommits = memo(function RepoCommits({ commits, owner, name }: RepoCommitsProps) {
  // console.log("render repo commits", owner, name)
  const { baseUrl } = config.github
  const commitsUrl = `${baseUrl}/${owner}/${name}/commits`

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography fontWeight="600">Recent Commits</Typography>
        </Box>
        <Link
          href={commitsUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          fontSize="0.875rem"
          fontWeight="500"
        >
          View all
        </Link>
      </Box>
      {commits.length === 0 ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary">No commits to show.</Typography>
        </Box>
      ) : (
        <Box>
          {commits.map((c, i) => (
            <Box
              key={c.sha}
              component="a"
              href={`${baseUrl}/${owner}/${name}/commit/${c.sha}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                borderTop: i > 0 ? 1 : 0,
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Avatar
                src={c.authorAvatarUrl || undefined}
                sx={{ width: 40, height: 40 }}
              >
                {c.authorLogin[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <Box component="span" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {c.authorLogin}
                  </Box>
                  {' committed '}
                  {formatRelativeTime(c.date)}
                  {' · '}
                  <Box
                    component="code"
                    sx={{
                      px: 0.5,
                      py: 0.25,
                      bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.800' : 'grey.100'),
                      borderRadius: 0.5,
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                    }}
                  >
                    {c.shaShort}
                  </Box>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  )
})
