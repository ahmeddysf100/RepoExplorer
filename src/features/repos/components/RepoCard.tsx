import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import type { Repo } from '@/core/types/repo.types'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface RepoCardProps {
  repo: Repo
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            sx={{ width: 24, height: 24 }}
          />
          <Link
            component={RouterLink}
            to={`/repo/${repo.owner.login}/${repo.name}`}
            underline="hover"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {repo.full_name}
            </Typography>
          </Link>
        </Box>
        {repo.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {repo.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            icon={<StarIcon />}
            label={repo.stargazers_count}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<ForkRightIcon />}
            label={repo.forks_count}
            size="small"
            variant="outlined"
          />
          {repo.language && (
            <Chip label={repo.language} size="small" variant="outlined" />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
