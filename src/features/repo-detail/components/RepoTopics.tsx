import { Box, Card, Chip, Typography } from '@mui/material'

interface RepoTopicsProps {
  topics: string[]
}

export function RepoTopics({ topics }: RepoTopicsProps) {
  if (topics.length === 0) return null

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}>
      <Typography
        variant="caption"
        fontWeight="600"
        color="text.secondary"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5 }}
      >
        Topics
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {topics.map((t) => (
          <Chip
            key={t}
            label={t}
            size="small"
            sx={{
              height: 28,
              fontSize: '0.8125rem',
              borderRadius: '9999px',
              bgcolor: (th) =>
                th.palette.mode === 'dark'
                  ? 'rgba(37, 99, 235, 0.25)'
                  : 'rgba(37, 99, 235, 0.1)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: (th) =>
                th.palette.mode === 'dark'
                  ? 'rgba(37, 99, 235, 0.4)'
                  : 'rgba(37, 99, 235, 0.2)',
            }}
          />
        ))}
      </Box>
    </Card>
  )
}
