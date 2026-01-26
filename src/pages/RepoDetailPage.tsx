import { useEffect, useState } from 'react'
import { useParams, Navigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Link,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import BookIcon from '@mui/icons-material/Book'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ForkRightIcon from '@mui/icons-material/CallSplit'
import {
  getRepo,
  getRepoReadme,
  getRepoCommits,
  getRepoContributors,
  getRepoLanguages,
  getGitHubApiErrorMessage,
} from '@/core'
import type { Repo, CommitItem, ContributorItem, LanguageWithPercent } from '@/core'
import { formatCount } from '@/shared/utils/format'
import {
  RepoReadme,
  RepoTopics,
  RepoContributors,
  RepoLanguages,
  RepoCommits,
} from '@/features/repo-detail'

export function RepoDetailPage() {
  const { owner, name } = useParams()
  const [repo, setRepo] = useState<Repo | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [commits, setCommits] = useState<CommitItem[]>([])
  const [contributors, setContributors] = useState<ContributorItem[]>([])
  const [languages, setLanguages] = useState<LanguageWithPercent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!owner || !name) return
    setLoading(true)
    setError(null)
    const abort = new AbortController()
    Promise.all([
      getRepo(owner, name),
      getRepoReadme(owner, name),
      getRepoCommits(owner, name, 5),
      getRepoContributors(owner, name, 5),
      getRepoLanguages(owner, name),
    ])
      .then(([r, rm, cm, co, lg]) => {
        if (abort.signal.aborted) return
        setRepo(r as Repo)
        setReadme(rm)
        setCommits(cm)
        setContributors(co)
        setLanguages(lg)
      })
      .catch((e) => {
        if (abort.signal.aborted) return
        setError(getGitHubApiErrorMessage(e))
      })
      .finally(() => {
        if (!abort.signal.aborted) setLoading(false)
      })
    return () => abort.abort()
  }, [owner, name])

  useEffect(() => {
    if (owner && name) document.title = `${owner}/${name} — RepoExplorer`
    return () => { document.title = 'RepoExplorer - GitHub Repository Explorer' }
  }, [owner, name])

  if (!owner || !name) return <Navigate to="/search" replace />

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !repo) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error ?? 'Repository not found.'}
        </Alert>
        <Link component={RouterLink} to="/search" underline="hover">
          Back to Search
        </Link>
      </Box>
    )
  }

  const defaultBranch = repo.default_branch ?? 'main'
  const readmeUrl = `https://github.com/${owner}/${name}/blob/${defaultBranch}/README.md`
  const contributorsUrl = `https://github.com/${owner}/${name}/graphs/contributors`
  const topics = repo.topics ?? []

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookIcon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                <Link
                  href={`https://github.com/${owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="inherit"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  {owner}
                </Link>
                {' / '}
              </Typography>
              <Typography variant="h4" fontWeight="bold" letterSpacing="-0.02em">
                {repo.name}
              </Typography>
            </Box>
            <Chip
              label="Public"
              size="small"
              sx={{
                height: 22,
                fontSize: '0.75rem',
                bgcolor: (t) => (t.palette.mode === 'dark' ? 'grey.700' : 'grey.100'),
                color: (t) => (t.palette.mode === 'dark' ? 'grey.300' : 'grey.600'),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<StarBorderIcon />}
              sx={{ textTransform: 'none', borderRadius: 1 }}
            >
              Star {formatCount(repo.stargazers_count)}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ForkRightIcon />}
              sx={{ textTransform: 'none', borderRadius: 1 }}
            >
              Fork {formatCount(repo.forks_count)}
            </Button>
          </Box>
        </Box>
        {repo.description && (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            {repo.description}
          </Typography>
        )}
      </Box>

      <Grid container spacing={3} sx={{ flexDirection: { xs: 'column-reverse', lg: 'row' } }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {readme != null && (
            <RepoReadme readme={readme} readmeUrl={readmeUrl} />
          )}
          <RepoCommits commits={commits} owner={owner} name={name} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <RepoTopics topics={topics} />
            <RepoContributors contributors={contributors} contributorsUrl={contributorsUrl} />
            <RepoLanguages languages={languages} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
