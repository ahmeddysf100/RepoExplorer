import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Link,
  Chip,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import { Link as RouterLink } from 'react-router-dom'
import type { Repo } from '@/core/types/repo.types'
import { langColor } from '@/core'
import { formatCount } from '@/shared/utils/format'

interface RepoCardProps {
  repo: Repo
}

export function RepoCard({ repo }: RepoCardProps) {
  const topics = repo.topics ?? []

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 1,
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: (t) => (t.palette.mode === 'dark' ? 4 : 6),
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              variant="rounded"
              sx={{ width: 40, height: 40, borderRadius: 2 }}
            />
            <Box>
              <Link
                component={RouterLink}
                to={`/repo/${repo.owner.login}/${repo.name}`}
                underline="hover"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '250px',
                }}
              >
                {repo.full_name}
              </Link>
              <Chip
                label="Public"
                size="small"
                sx={{
                  ml: 1,
                  height: 20,
                  fontSize: '0.75rem',
                  bgcolor: (t) =>
                    t.palette.mode === 'dark' ? 'grey.700' : 'grey.100',
                  color: (t) =>
                    t.palette.mode === 'dark' ? 'grey.300' : 'grey.600',
                }}
              />
            </Box>
          </Box>
          <IconButton
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }}
            aria-label="Star"
          >
            <StarBorderIcon />
          </IconButton>
        </Box>

        {repo.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {repo.description}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            color: 'text.secondary',
          }}
        >
          {repo.language && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: langColor(repo.language),
                }}
              />
              <span>{repo.language}</span>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{formatCount(repo.stargazers_count)}</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ForkRightIcon sx={{ fontSize: 18 }} />
            <span>{formatCount(repo.forks_count)}</span>
          </Box>
        </Box>

        {topics.length > 0 && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {topics.slice(0, 5).map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  bgcolor: (t) =>
                    t.palette.mode === 'dark'
                      ? 'rgba(37, 99, 235, 0.25)'
                      : 'rgba(37, 99, 235, 0.1)',
                  color: (t) =>
                    t.palette.mode === 'dark' ? '#93c5fd' : '#2563eb',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
